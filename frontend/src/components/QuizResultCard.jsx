import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function QuizResultCard ({
        id,
        title,
        subheader,
        image, 
        completed,
        correctAnswer, 
        totalCorrectAnswer
    }) {

        
    const [dateStringFormat, setDateStringFormat] = useState('');

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(()=>{
        const date = new Date(completed);
        setDateStringFormat(formatDate(date));
    }, []);

    return (
        <Card sx={{ maxWidth: 350, p : 2, color: 'primary.themewhite', bgcolor: 'primary.mainGreenDark', 
        borderRadius: '10%', padding: '20px, 20px', height: 300, 
        boxShadow: (correctAnswer / totalCorrectAnswer) >= 0.66 ? '0 3px 10px green' 
        : (correctAnswer / totalCorrectAnswer)>=0.33 ? '0 3px 10px orange' 
        : '0 3px 10px red'
        }}>
            <CardMedia
                component="img"
                sx={{ height: '85%', borderRadius: '20px',transitionDuration: '1s', "&:hover": { cursor: "pointer", height: "55%", transitionDuration: '1s' }}}
                image={image}
            />
            <Typography gutterBottom variant="h5" sx={{fontWeight:'bold', mt:1}}>
                {title}
            </Typography>
            <CardContent sx={{color:'#CED4DA'}}>
                <Typography variant="body2" sx={{mb:2}}>
                    {subheader}
                </Typography>
                <Box sx={{display:'flex', justifyContent:'space-between', color: 'primary.themewhite'}}>
                    <Box >
                        {dateStringFormat}
                    </Box>
                    <Box>
                        {correctAnswer}
                        /
                        {totalCorrectAnswer}    
                    </Box> 
                </Box>
            </CardContent>
        </Card>
    );
}
