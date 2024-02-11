import React from "react";
import {
    Flex, Text, Button, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, IconButton, Img, HStack
} from "@chakra-ui/react";
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css'
import { ThTable } from "./th";
import { TdTable } from "./td";
import { IPokemonInd } from "../Pokemon";


export const TableList: React.FC<IPokemonInd> = ( {moves, details}:IPokemonInd) => {

    return (
        <TableContainer
            //p={0}
            pt={4}
            transitionDuration="1.0s"
            border={'1px solid rgba(234, 236, 240, 1'}

        >
            <Table
                variant='simple'
            >
                <TableCaption textAlign={"left"} p={0}>
                    <Flex justify="space-between">
                        1-4 de 04 itens

                        <Flex p={0} color={'rgba(52, 64, 84, 1)'}>
                            <Button
                                mr={2}
                                fontSize={"12px"}
                                //borderRightRadius={0}
                                fontWeight={"none"}
                                bg={"none"}
                                border={"1px solid"}
                                borderColor={"rgba(208, 213, 221, 1)"}
                                borderRadius={'8px'}
                                color={'rgba(52, 64, 84, 1)'}
                            >
                                anterior
                            </Button>
                            <Button
                                ml={2}
                                fontSize={"12px"}
                                //borderLeftRadius={0}
                                fontWeight={"none"}
                                bg={"none"}
                                border={"1px solid"}
                                borderColor={"rgba(208, 213, 221, 1)"}
                                color={'rgba(52, 64, 84, 1)'}
                                borderRadius={'8px'}

                            >
                                próximo
                            </Button>
                        </Flex>
                    </Flex>
                </TableCaption>

                <Thead>
                    <Tr
                        borderTop="1px solid rgba(234, 236, 240, 1)"
                        borderBottom="1px solid rgba(234, 236, 240, 1)"

                        bg="rgba(252, 252, 253, 1)"
                    >
                    
                        <ThTable title="Accuracy" customIcon={<AiOutlineArrowDown />} />
                        <ThTable title="Power" customIcon={<AiOutlineArrowDown />} />
                        <ThTable title="Type" customIcon={<AiOutlineArrowDown />} />
                    </Tr>


                </Thead>

                <Tbody>
                        {details.map((item, index) => (
                            <Tr key={index}>
                                
                                <TdTable text={item.accuracy}/>
                                <TdTable text={item.power} />
                                <TdTable text={item.type} />                             
                               
                            </Tr>
                        ))}
                    </Tbody>
            </Table>
        </TableContainer>

    );

};

