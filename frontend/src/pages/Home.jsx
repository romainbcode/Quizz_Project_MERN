import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import axios from 'axios';
import moment from 'moment';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';



const Home = () => {

  const [isloading, setLoading] = useState(false);
  const [quizs, setQuizs] = useState([])

  const showQuizs = async()=>{
    setLoading(true);
    try{
      const { data } = await axios.get('/api/quizs/show')
      setQuizs(data.quizs)
      setLoading(false)
    }catch(error){
      console.log(error.response.data.error)
    }
  }

  useEffect(()=>{
    console.log(quizs)
    showQuizs();
  }, []);


  return (
    <>
      <Box sx={{bgcolor: "#fafafa", minHeight: "100vh"}}>
      <Navbar/>
          <Container sx={{pt:5, pb:5, minHeight: "83vh"}}>
            <Box sx={{flexGrow:1}}>
              <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                <h1>HOME PAGE</h1>
                
                {
                    isloading ? <>Loading....</> : 
                    quizs && quizs.map((quiz, index) =>(
                        <Grid item xs={2} sm={4} md={4} key={index}>
                        <PostCard
                            title={quiz.title}
                            subheader={quiz.subheader}
                            image={quiz.image ? quiz.image.url : ''}
                        />
                        </Grid>
                    ))
                    }
                
              </Grid>
            </Box>
          </Container>
      </Box>
    </>
  )
}

export default Home;
