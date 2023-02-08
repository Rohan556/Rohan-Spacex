import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Card from '@/components/Card'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import getData from '@/lib/ApolloService'
import { useState } from 'react';
import { pageSize } from '@/config';
import PageNumbers from '@/components/PageNumbers';
import { HomeDataTypes, HomePropTypes
 } from '@/lib/types';
 import { handlePageChange } from '@/lib/helpers';

export async function getServerSideProps(){
  
  const queryString = `
  query {
    launches{
      id
      mission_name
      links {
        video_link
        article_link
        wikipedia
      }
    }
  }
  `
  let data: any = await getData(queryString)
  console.log({data});
  
  return { props:  data  }
}


export default function Home(props: HomePropTypes) {

  let completeData = props.data.launches;
  let number_of_pages = Math.ceil((completeData.length) / pageSize);
  const [dataToDisplay, setDataToDisplay] = useState(completeData.slice(0, pageSize))

  //Handlers

  function handlePageChangeHandler(pageNumber: number){
    setDataToDisplay(handlePageChange(pageNumber, number_of_pages, pageSize, completeData));
  }
  

  return (
    <>
      <Head>
        <title>SpaceX Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <div>
        <Header />
        <div className={styles.content}>
            <h2 className={styles.heading}>All of our launches</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {
                  dataToDisplay.map((launch: HomeDataTypes) => {
                    return (
                      <Grid item xs={12} md={4} lg={2} key={launch.id}>
                        <Card data={launch}/>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Box>    
            <PageNumbers numberOfPages={number_of_pages} handlePageChange={handlePageChangeHandler}/>
        </div>
       
      </div>
    </>
  )
}