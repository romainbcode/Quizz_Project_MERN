import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import AnswerList from '../components/AnswerList';
import Loader from '../components/Loader'
import SendIcon from '@mui/icons-material/Send'

const SinglePost = () => {
    
    const [title, setTitle] = useState('');
    const [subheader, setSubheader] = useState('');
    const [image, setImage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [questionAnswer, setQuestionAnswer] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalGoodAnswer, setTotalGoodAnswer] = useState(0);

    const { id } = useParams();

    const [answerClicked, setAnswerClicked] = useState(0);

    const [loadLocalStorage, setLoadLocalStorage] = useState(false)

    const updateNumberGoodAnswer=()=>{
        setAnswerClicked(answerClicked+1)
    }

    const displaySinglePost = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/quiz/show/${id}`);
            setTitle(data.quiz.title);
            setSubheader(data.quiz.subheader);
            setImage(data.quiz.image.url);
            setCreatedAt(data.quiz.createdAt);
            setQuestionAnswer(data.quiz.questionAnswer) 
            setTotalGoodAnswer(data.quiz.questionAnswer.length)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const addScoreQuiz = async () => {
        setLoadLocalStorage(true)
        try {
            const { data } = await axios.put(`/api/addscore/quiz/${id}`, { 
                correctAnswer: answerClicked,
                totalCorrectAnswer: totalGoodAnswer
             });
            if (data.success === true) {
                toast.success("score quiz added");
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    useEffect(() => {
        localStorage.setItem('answerTrueFalse', JSON.stringify(0))
    }, [loadLocalStorage])

    useEffect(() => {
        displaySinglePost();
    }, [])

    return (
        <>
            <Navbar titlePage={`${title}`}/>
            <Box sx={{display: 'flex', justifyContent:'center', width: '100%', height:'100%', pt:2}}>
                {
                loading ? <Loader/> :
                    <Box sx={{display: 'flex', justifyContent:'center', width: '90%'}}>
                        <Card sx={{height: '100%', width: '100%', bgcolor:'transparent', boxShadow:'none'}}>
                            <Box sx={{color:'primary.themewhite', bgcolor: "primary.mainGreenDark", borderRadius: '20px', boxShadow: '0 3px 10px #000', m:2 }}>
                                <Typography variant="body1" sx={{p:2}}>
                                    <Box component='span' dangerouslySetInnerHTML={{ __html: subheader }}></Box>
                                </Typography>
                            </Box>
                            <CardContent sx={{mb:3, mt:3}}>
                                {
                                    questionAnswer.length === 0 ? 'Any answer' :
                                    questionAnswer && questionAnswer.map((an, index)=>(
                                        <Box sx={{bgcolor:"primary.mainGreenDark", borderRadius: '20px', boxShadow: '0 3px 10px #000'}}>
                                            <AnswerList question={an.question} answer={an.answer} numbertotalanswer={totalGoodAnswer} numberGoodAnswer={updateNumberGoodAnswer}/>
                                        </Box>
                                    ))
                                }
                            </CardContent>
                            <Button 
                                onClick={()=>
                                    addScoreQuiz()
                                }
                                variant="contained" color="success"
                                endIcon={<SendIcon />}
                            > 
                            Send
                            </Button>
                        </Card>
                    </Box>
                }
            </Box>
        </>
    );
}

export default SinglePost;
