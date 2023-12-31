import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import axios from 'axios';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader'

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
            console.log(error)
        }
    }

    useEffect(()=>{
        showQuizs();
    }, []);

    return (
    <>
        <Navbar titlePage={"Home page"}/>
        <Box sx={{minHeight: "100vh"}}>
            <Container sx={{pt:4, pb:5, height: "60vh", width: '100%'}}>
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>   
                    {
                        isloading ? <Loader/> : 
                        quizs && quizs.map((quiz, index) =>(
                            <Grid item xs={2} sm={4} md={4} key={index} >
                            <PostCard
                                id={quiz._id}
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
