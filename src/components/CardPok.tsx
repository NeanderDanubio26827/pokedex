import { Card, CardBody, CardFooter, Heading, Stack, Image, Text } from '@chakra-ui/react'


export const CardPok = ({id, name, image}) => {

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            w={300}
            h={300}
            
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '500px', md: '500px', lg: '500px', lx: '500px' }}
                src={image}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Heading size='md'>{id}</Heading>

                <Text py='2'>
                    {name}
                </Text>
                </CardBody>

                <CardFooter>
                </CardFooter>
            </Stack>
            </Card>
    )
}