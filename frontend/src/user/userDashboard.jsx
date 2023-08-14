import {Box, Container, Grid} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Loader from '../components/Loader'
import QuizResultCard from '../components/QuizResultCard'

const UserDashboard = () => {

    const [isloading, setLoading] = useState(false);
    const [quizScoresDetails, setQuizScoresDetails] = useState([])
    const [average, setAverage] = useState(0)
    const { user } = useSelector(state => state.userProfile);

    const getScoresQuizs = async()=>{
        setLoading(true);
        try{
            const { data } = await axios.get('/api/user/getscore')
            setQuizScoresDetails(data.arrayScoresDetailsUser)
            setAverage(data.averageTotal)
            setLoading(false);
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getScoresQuizs();
    }, []);

    return (
        <>
            <Navbar titlePage={`${user ? (user.username + "'s") : ""} history, average : ${average*100}%`}/>
            <Box sx={{minHeight: "100vh"}}>
                <Container sx={{pt:4, pb:5, height: "60vh", width: '100%'}}>
                    <Box sx={{flexGrow:1}}>
                        <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                            {
                                isloading ? <Loader/> : 
                                quizScoresDetails && quizScoresDetails.map((quizScore, index) =>(
                                    <Grid item xs={2} sm={4} md={4} key={index} >
                                        <QuizResultCard
                                            id={quizScore._id}
                                            title={quizScore.title}
                                            subheader={quizScore.subheader}
                                            image={quizScore.image ? quizScore.image.url : ''}
                                            completed={quizScore.completed}
                                            correctAnswer={quizScore.correctAnswer}
                                            totalCorrectAnswer={quizScore.totalCorrectAnswer}
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

export default UserDashboard
