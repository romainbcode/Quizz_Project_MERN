import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const AnswerList = ({ question, answer, numbertotalanswer, numberGoodAnswer}) => {
    const [loading, setLoading] = useState(false);    
    const [answerState, setAnswerState] = useState(
        answer.map(ans => ans.stateAnswer)
    );

    const clickHandlers = (ans, index) => {
        if(JSON.parse(localStorage.getItem('answerTrueFalse'))){
            var numgoodanswer = JSON.parse(localStorage.getItem('answerTrueFalse'))
            localStorage.setItem('answerTrueFalse', JSON.stringify(numgoodanswer+1))
            if(ans.stateAnswer){
                numberGoodAnswer()
            }
        }else{
            localStorage.setItem('answerTrueFalse', JSON.stringify(1))
            if(ans.stateAnswer){
                numberGoodAnswer()
            }
        }
        setLoading(true)
        
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
                                borderColor: loading ? answerState[index] ? 'green' : 'red' : 'transparent'
                            }}
                            onClick={() => 
                                clickHandlers(ans, index)
                            }  
                        >
                        <h2>
                            {ans.answerText}
                            
                        </h2>
                        {
                            loading ? answerState[index] ? 
                            <DoneIcon sx={{color:'green', width:'30px', height:'30px'}}/>
                            :
                            <CloseIcon sx={{color:'red', width:'30px', height:'30px'}}/>
                            :
                            <></>
                        }
                        </Button>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default AnswerList;