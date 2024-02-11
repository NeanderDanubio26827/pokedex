import { Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { Children, FormEvent, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
} from '@chakra-ui/react'
import { Pokedex } from "./Pokedex";


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

export const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState('');
  const [filteredPokemon, setfilteredPokemon] = useState<IPokemonInd[]>([]);
  const [data, setData] = useState<IPokemonProps[]>([]);
  const [dataPoke, setDataPoke] = useState<IPokemonInd[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
      const modifiedData = response.data.results.map((result: any) => ({
        id: result.url.split('/').slice(-2, -1)[0],
        name: result.name,
        url: result.url,
        next: result.next,
      }));
      setData(modifiedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataById = async () => {
      const pokemonDetails: IPokemonInd[] = [];
      for (const pokemon of data) {
        const response = await axios.get<IPokemonInd>(pokemon.url);
        pokemonDetails.push(response.data);
      }
      setDataPoke(pokemonDetails);
      //console.log(pokemonDetails)
      console.log(dataPoke)
    };
    fetchDataById();
  }, [data]);

 

  const viewOnePokemon = (id: number | string) => {
    const param = id;  
    setfilteredPokemon(dataPoke.filter((item) => item.id === param || item.name === param));
};

  const handleSubmit = async (e: FormEvent, id: number | string) => {
    e.preventDefault();
    viewOnePokemon(id)
  };

  return (
    <Flex
      bg={'black'}
      align={'center'}
      w={'100%'}
      border={'1px dashed blue'}
      flexDirection={'column'}
      borderRadius={'20px'}
    >
        
        <Pokedex dataPoke={dataPoke} />                    

      </Flex>
   
  )
};


