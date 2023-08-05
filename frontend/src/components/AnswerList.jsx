import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { green } from '@mui/material/colors';


const AnswerList = ({ question, answer }) => {
    const [loading, setLoading] = useState(false);
    const [trueButton, setTrueButton] = useState(false);
    const [borderColors, setBorderColors] = useState('transparent')

    const [answerState, setAnswerState] = useState(
        answer.map(ans => ans.stateAnswer)
    );

      const clickHandler = (ans, index) => {
        // Mettre à jour l'état de la réponse en inversant sa valeur
        const newAnswerState = [...answerState];
        newAnswerState[index] = !newAnswerState[index];
        setAnswerState(newAnswerState);
      };

    const clickHandlers = (mess1, message) => {
		console.log(mess1, message);
        if(mess1.stateAnswer){
            console.log("true")
            let purple = '#A020F0';
            setBorderColors(green[600]);
            setTrueButton(true)
            setLoading(true)
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
                        <Button disabled={loading} sx={{width:'40%', bgcolor: "primary.light", borderRadius: '20px', boxShadow: '0 3px 10px #000', m:2}}
                            style={{
                                border: '3px solid',
                                borderColor: loading && answerState[index] ? 'green' : 'transparent', // Utilisation de l'état pour définir la couleur de la bordure
                            }}
                            onClick={() => clickHandlers(ans, index)}
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