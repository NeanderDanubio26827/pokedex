import { Button, Flex } from "@chakra-ui/react";
import { CardPok } from "./CardPok";
import {  useState } from "react";
import { IPokemonInd } from "./Pokemon";


export interface IPokedexProps {
    dataPoke: IPokemonInd[];
  }

export const Pokedex: React.FC <IPokedexProps> = ({dataPoke}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : dataPoke.length - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex < dataPoke.length - 1 ? prevIndex + 1 : 0
        );
    };
    if (dataPoke.length === 0 || currentIndex < 0 || currentIndex >= dataPoke.length) {
        return <div>No Pokémon found</div>;
      }
    return (
        <Flex align={'center'} justify={'center'}>

        <Flex w={600} h={'100vh'} bg={'red'} borderLeftRadius={'25px'} align={'center'} justify={'center'} flexDirection={'column'} gap={4}>
            <Flex flexDirection={'column'} justifyContent={'space-evenly'} gap={4}>
            <Button borderRadius={65} colorScheme="blue" boxSize={'50px'} mr={'auto'}> </Button>
            <Flex bg={'white'} boxSize={400} borderRadius={'20px'} align={'center'} gap={4} justify={'center'}>
                    
                    <Flex flexDirection="column" align={'center'} gap={4} justify={'center'} >
                    <CardPok
                        id={dataPoke[currentIndex].id}
                        name={dataPoke[currentIndex].name}
                        image={dataPoke[currentIndex].sprites.front_default}
                        />
                    </Flex>
            </Flex>
            </Flex>
            <Flex flexDirection={'row'} justifyContent={'space-between'} gap={4}>

            <Button colorScheme='messenger' onClick={handlePrevious} w={40}>Voltar </Button>
            <Button colorScheme='whatsapp' onClick={handleNext} w={40}>Avançar </Button>
            </Flex>
        </Flex>
        </Flex>
    )
}; 