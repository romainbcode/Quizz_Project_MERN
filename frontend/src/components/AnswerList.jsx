import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { QuestionAnswer } from '@mui/icons-material';

const AnswerList = ({ question, answer, numbertotalanswer, numberGoodAnswer}) => {
    const [loading, setLoading] = useState(false);    
    const [answerState, setAnswerState] = useState(
        answer.map(ans => ans.stateAnswer)
    );


    const clickHandlers = (ans, index) => {
        if(JSON.parse(localStorage.getItem('test2'))){
            
            var numm = JSON.parse(localStorage.getItem('test2'))
            localStorage.setItem('test2', JSON.stringify(numm+1))
            console.log("child" + JSON.parse(localStorage.getItem('test2')))
            if(ans.stateAnswer){
                numberGoodAnswer()
            }
        }else{
            localStorage.setItem('test2', JSON.stringify(1))
            if(ans.stateAnswer){
                numberGoodAnswer()
            }
        }
        setLoading(true)
        
        //JSON.parse(localStorage.getItem('test2'))
	}

    return (
        <>
            <Box sx={{width:'100%', mb:2}}>
                <Typography variant='h3' sx={{display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold', color:'primary.themewhite'} }>
                    {question}
                </Typography>
                <Box sx={{width: '100%', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
                    {answer.map((ans, index)=>(
                        <Button disabled={loading} key={index} sx={{width:'40%', bgcolor: "primary.light", borderRadius: '20px', boxShadow: '0 3px 10px #000', m:2}}
                            style={{
                                border: '3px solid',
                                borderColor: (loading) && answerState[index] ? 'green' : 'transparent'
                            }}
                            onClick={() => 
                                clickHandlers(ans, index)
                               
                            }  
                        >
                        <h2>{ans.answerText}</h2>
                        </Button>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default AnswerList;