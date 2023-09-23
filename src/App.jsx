import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, Button, Avatar, CardFooter, CardHeader, SimpleGrid, HStack, Image, Heading } from '@chakra-ui/react';
import dataDb from './db';
import axios from 'axios';
import { useGetAllPostsQuery } from './slices/pokemon';
function App() {
  const { data = [].slice(0, 4000), isError, isLoading, isSuccess } = useGetAllPostsQuery();
  const [currentPage, setCurrentpage] = useState(1);
  const perPage = 4;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const totalpage = Math.ceil(data.length / perPage);
  console.log(data.length);
  const preFunc = () => {
    firstIndex < currentPage ? setCurrentpage(1) : setCurrentpage(currentPage - 1);
  };
  const nextFunc = () => {
    lastIndex >= data.length ? setCurrentpage(currentPage) : setCurrentpage(currentPage + 1);
  };


  return (
    <>
      <Container maxW={'container.lg'} bgColor={'whitesmoke'} h={'full'}>
        <SimpleGrid p={4} spacing={4} templateColumns={'repeat(auto-fill, minmax(220px,1fr))'}>
          {isLoading ? (
            <Heading>Loading</Heading>
          ) : isSuccess ? (
            data.slice(firstIndex, lastIndex).map((d, i) => (
              <Card boxShadow={'lg'}>
                <CardHeader margin={'auto'}>
                  <Avatar />
                </CardHeader>
                <CardBody>{d.title.slice(0, 40)}</CardBody>
                <CardFooter>
                  <Image src={d.thumbnailUrl} />
                </CardFooter>
              </Card>
            ))
          ) : null}
        </SimpleGrid>
        <Button w={'full'} margin={'auto'} onClick={nextFunc}>
          More
        </Button>
        <HStack w={'full'} justifyContent={'center'}>
          {currentPage === 1 ? (
            ''
          ) : (
            <Button variant={'solid'} colorScheme={'red'} onClick={preFunc}>
              Pre
            </Button>
          )}
          {Array.from({ length: 10 }).map((b, i) => (
            <Button colorScheme='red' variant={currentPage == i + 1 ? 'solid' : 'outline'} onClick={() => setCurrentpage(i + 1)}>
              {i + 1}
            </Button>
          ))}
          {currentPage === totalpage ? (
            ''
          ) : (
            <Button variant={'solid'} colorScheme={'red'} onClick={nextFunc}>
              Next
            </Button>
          )}
        </HStack>
      </Container>
    </>
  );
}

export default App;
