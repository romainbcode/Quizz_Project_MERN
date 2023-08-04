import * as React from 'react';
import { Box } from '@mui/material';

const AnswerList = ({ question, answer }) => {
    return (
        <>
            <Box className='formContainer'>
                <h1>{question}</h1>
                {answer.map((ans, index)=>(
                    <div className='ok'>
                        <h1>{ans.answerText}</h1>
                        
                    </div>
                ))}
            </Box>
        </>
    );
}

export default AnswerList;