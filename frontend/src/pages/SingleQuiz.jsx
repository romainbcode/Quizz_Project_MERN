import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Divider, Grid } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { toast } from 'react-toastify';
import AnswerList from '../components/AnswerList';
import Loader from '../components/Loader'

const SinglePost = () => {
    

    const { userInfo } = useSelector(state => state.signIn);

    const [title, setTitle] = useState('');
    const [usernameCreater, setUsernameCreater] = useState('');
    const [subheader, setSubheader] = useState('');
    const [image, setImage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [answer, setAnswer] = useState([]);
    const [questionAnswer, setQuestionAnswer] = useState([])
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    //fetch single post
    const displaySinglePost = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/quiz/show/${id}`);
            setTitle(data.quiz.title);
            setSubheader(data.quiz.subheader);
            setImage(data.quiz.image.url);
            setCreatedAt(data.quiz.createdAt);
            setQuestionAnswer(data.quiz.questionAnswer) 
            console.log("before", questionAnswer)          
            setLoading(false);
            console.log("after", questionAnswer)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displaySinglePost();
        console.log("useEffect", questionAnswer)
    }, [])
    
    return (
        <>
            <Navbar />
            <Box sx={{display: 'flex', justifyContent:'center', width: '100%', height:'100%', pt:2}}>
                {
                    loading ? <Loader/> :
                        <Box sx={{display: 'flex', justifyContent:'center', width: '90%'}}>
                            <Card sx={{height: '100%', width: '100%', bgcolor:'transparent', boxShadow:'none'}}>
                                <Box sx={{color:'primary.themewhite', bgcolor: "primary.mainGreenDark", borderRadius: '20px', boxShadow: '0 3px 10px #000', m:2 }}>
                                    <CardHeader
                                        title={title}
                                    />
                                    <Typography variant="body2" sx={{pb:2}}>
                                        <Box component='span' dangerouslySetInnerHTML={{ __html: subheader }}></Box>
                                    </Typography>
                                </Box>
                                
                                <CardContent sx={{mb:3, mt:3}}>
                                    {
                                        questionAnswer.length === 0 ? 'Any answer' :
                                            questionAnswer && questionAnswer.map((an, index)=>(
                                                <Box sx={{bgcolor:"primary.mainGreenDark", borderRadius: '20px', boxShadow: '0 3px 10px #000'}}>
                                                    <AnswerList question={an.question} answer={an.answer}
                                                    />
                                                </Box>
                                            ))
                                    }
                                </CardContent>
                            </Card>
                        </Box>
                }
            </Box>
        </>
    );
}

export default SinglePost;
