import axios from "axios";
import { useState, ChangeEvent } from "react";
import { Button, Flex, Text, Input, Table, TableCaption, TableContainer, Tbody, Thead, Tr, Image } from "@chakra-ui/react";
import { ThTable } from "./table/th";
import { TdTable } from "./table/td";

export interface IPokemonProps {
  id: number;
  name: string;
  url: string;
  next: string;
}

export interface IPokemonInd extends IPokemonProps { 
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[];
    details: {
      accuracy: number;
      power: number;
      type: {
        name: string;
        url: string;
      }
    }[];
}

export const Desafio = () => {
  const [namePokemon, setNamePokemon] = useState<string>('');
  const [movesPokemon, setMovesPokemon] = useState<IPokemonInd[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentIndexImg, setCurrentIndexImg] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : movesPokemon.length - 1
    );
    setCurrentIndexImg((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < movesPokemon.length - 1 ? prevIndex + 1 : 0
    );
    setCurrentIndexImg((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNamePokemon(e.target.value);
  };

  const handleFetchPokemonData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
      const moves = await Promise.all(response.data.moves.map(async (move: any) => {
        const moveDetails = await handleSubMoves(move.move.url);
        return {
          name: move.move.name,
          url: move.move.url,
          details: moveDetails,
        };
      }));
      const sprites = response.data.sprites;
      const spriteUrls = Object.values(sprites).filter((sprite: string | null) => sprite !== null);
      setImages(spriteUrls as string[]);
      setMovesPokemon(moves);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleSubMoves = async (url: string) => {
    try {
      const response = await axios.get(url);
      const moveDetails = {
        accuracy: response.data.accuracy,
        power: response.data.power,
        type: response.data.type,
      };
      return moveDetails;
    } catch (error) {
      console.error('Error fetching move data:', error);
      return null;
    }
  };

  return (
    <Flex align="center" justify="center" flexDirection="column" minHeight="100vh">
      <Flex direction="column" align="center" border="2px dashed red" w={400} h={600} justifyContent="space-around" borderRadius="20px">
        <Flex flexDirection="row" align="center" justify="center" gap={2}>
          <Flex flexDirection={'row'} gap={2}>
          <Input
            name="namePokemon"
            value={namePokemon}
            onChange={handleChange}
            placeholder="Enter Pokemon name"
            w={300}
            />
          <Button onClick={handleFetchPokemonData}colorScheme="whatsapp" >Fetch</Button>
          </Flex>
        </Flex>
        <Flex flexDirection={'column'}>
        <Text align={'center'}>Moves of <Text fontWeight={600}>{namePokemon}</Text></Text>
        {images.length > 0 && <Image src={images[currentIndexImg]} boxSize={80} alt={`Sprite ${currentIndexImg}`} />}
        </Flex>
        <TableContainer pt={4} transitionDuration="1.0s" border="1px solid rgba(234, 236, 240, 1)">
          <Table variant="simple">
            <TableCaption textAlign="left" p={0}>
              <Flex justify="space-between">
                {currentIndex + 1} de {movesPokemon.length}
                <Flex p={0} color="rgba(52, 64, 84, 1)">
                  <Button mr={2} fontSize="12px" fontWeight="none" bg="none" border="1px solid" borderColor="rgba(208, 213, 221, 1)" borderRadius="8px" color="rgba(52, 64, 84, 1)" onClick={handlePrevious}>
                    Previous
                  </Button>
                  <Button ml={2} fontSize="12px" fontWeight="none" bg="none" border="1px solid" borderColor="rgba(208, 213, 221, 1)" color="rgba(52, 64, 84, 1)" borderRadius="8px" onClick={handleNext}>
                    Next
                  </Button>
                </Flex>
              </Flex>
            </TableCaption>
            <Thead>
              <Tr borderTop="1px solid rgba(234, 236, 240, 1)" borderBottom="1px solid rgba(234, 236, 240, 1)" bg="rgba(252, 252, 253, 1)">
                <ThTable title="Name" />
                <ThTable title="Accuracy" />
                <ThTable title="Power" />
                <ThTable title="Type" />
              </Tr>
            </Thead>
            <Tbody>
              {movesPokemon.length > 0 && (
                <Tr>
                  <TdTable text={`${movesPokemon[currentIndex].name}`} />
                  <TdTable text={`${movesPokemon[currentIndex].details ? movesPokemon[currentIndex].details.accuracy : 'N/A'}`} />
                  <TdTable text={`${movesPokemon[currentIndex].details ? movesPokemon[currentIndex].details.power : 'N/A'}`} />
                  <TdTable text={`${movesPokemon[currentIndex].details ? movesPokemon[currentIndex].details.type.name : 'N/A'}`} />
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
