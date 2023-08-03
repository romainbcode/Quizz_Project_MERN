import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add'
import { Checkbox } from '@mui/material';
import { useFormik, Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {modules} from '../components/moduleToolbar.jsx'
import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar';





const CreateQuiz = () => {
    const [currentValue, setCurrentValue] = useState(0)

    const initialValues = {
        title: '',
        subheader: '',
        image: null,
        questionAnswer:{
            question:'',
            answer:[
                {
                    answerText : '',
                    stateAnswer : false
                }
                
            ]
        }
    };

    const onSubmit = (values) =>{
        //createNewQuiz(values);
        alert(JSON.stringify(values, null, 2));
        console.log("clique")
        //actions.resetForm();
    }

    const validationSchema = yup.object({/*
        title: yup
            .string('Add a post title')
            .min(4, 'text content should havea minimum of 4 characters ')
            .required('Post title is required'),
        subheader: yup
            .string('Add text content')
            .min(10, 'text content should have a minimum of 10 characters ')
            .required('text content is required'),
        questionAnswer : yup.object({
            question: yup
            .string('Add a question')
            .min(10, 'Question should have a minimum of 10 characters '),
            answer : yup.array(
                yup.object({
                    answerText: yup
                    .string('Add an answer')
                    .min(10, 'Answer should have a minimum of 10 characters '),
                    stateAnswer: yup
                    .boolean('Declare False or True')
                })
            ).min(2, 'You must add a minimum of 2 answers')
             .max(4, 'You must add a maximum of 4 answers')
        }) */     
    });
    
    const createNewQuiz = async (values) => {
        console.log(values)
        try {
            const { data } = await axios.post('/api/quiz/create', values);
            toast.success('Quiz created');
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    

    return (
        <>
        <Navbar/>
        <Formik 
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {(formik)=>{
            const {values} = formik;
            return(
                <Form>
                    <Box sx={{ bgcolor: "primary.greenLight", height:'100vh', width:'100%', display: "flex", justifyContent: 'center', pt: 3}}>
                    <Box sx={{ bgcolor: "primary.mainGreenDark",height: '90%', width:'85%', padding: 5, borderRadius: '5%', boxShadow: '0 3px 10px #000' }}>
                        <Typography variant='h5' sx={{ pb: 4, color: 'primary.themewhite'}}> Create Quiz  </Typography>
                        <Box sx={{mt:1}} component="form">
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <Field
                                sx={{ mb: 3, width: '50%',
                                fieldset: { borderColor: "primary.themewhite" }
                             }}
                                autoComplete="off"
                                name="title"
                                placeholder="title"
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        color: "primary.themewhite"
                                    }
                                }}
                                label="Quiz title"
                                value={values.title}
                                as={TextField}
                            />
                            <Field
                                sx={{ mb: 3, width: '50%',
                                fieldset: { borderColor: "primary.themewhite" }
                            }}
                                autoComplete="off"
                                name="subheader"
                                placeholder="subheader"
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        color: "primary.themewhite"
                                    }
                                }}
                                label="Quiz subheader"
                                as={TextField}
                            />
                            
                        </Stack>
                        <Field
                            sx={{ mb: 3, width: '100%',
                            fieldset: { borderColor: "primary.themewhite" }
                        }}
                            id="questionAnswer.question"
                            name='questionAnswer.question'
                            placeholder="Quiz question"
                            InputLabelProps={{
                                shrink: true,
                                sx: {
                                    color: "primary.themewhite"
                                }
                            }}
                            label="Quiz question"
                            as={TextField}
                        />
                        </Box>
                        
                        <FieldArray
                        type="questionAnswer.answer"
                        name="questionAnswer.answer"
                        id="questionAnswer.answer"
                        value={values.questionAnswer.answer}
                        render={(arrayHelpers) => (
                        <div className="formContainer">
                            {values.questionAnswer.answer.map((TestCase, index) => (
                            <div className="formContainer " style={{display:'flex',flexDirection:'row', alignItems:'center', marginBottom: '15px'}} key={index}>
                                <Field
                                    sx={{width: '85%',
                                    fieldset: { borderColor: "primary.themewhite" }
                                }}
                                    name={`questionAnswer.answer.${index}.answerText`}
                                    placeholder="Answer text"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                            color: "primary.themewhite"
                                        }
                                    }}
                                    label={`Answer : ${index}`}
                                    as={TextField}
                                />
                                <Box style={{display:'flex',flexDirection:'column', marginLeft: 10}}>
                                    <Box style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Field
                                            sx={{height:'20px', width:'20px', alignItems:'center', mr:1,
                                            color: 'primary.themewhite'
                                        }}
                                            name={`questionAnswer.answer.${index}.stateAnswer`}
                                            as={Checkbox}
                                        />
                                        True/False
                                    </Box>
                                    
                                    <Button variant="contained" color="error"
                                        sx={{mt:0.5, width: '100%', height: '25px', }}
                                        onClick={() => arrayHelpers.remove(index)}
                                        startIcon={<DeleteIcon />}
                                    >
                                    Delete
                                    </Button>
                                </Box> 
                                
                            </div>
                            ))}

                
                            <Button variant="contained" 
                                onClick={() => {
                                    arrayHelpers.push({answerText: '',stateAnswer: false})
                                }}
                                sx={{width: '25%', height: '50%', mb:2}}
                                endIcon={<AddIcon />}
                            >
                                Add an answer
                            </Button>
                            
                        </div>
                        )}
                    />
                    <Box border='2px dashed white' sx={{ p: 1}}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            //maxFiles={3}
                            onDrop={
                                acceptedFiles => {
                                    acceptedFiles.map((file, index) => {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onloadend = () => {
                                            formik.setFieldValue('image', reader.result)
                                        }
                                    })
                                }
                            }
                            
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <Box
                                    {...getRootProps()}

                                    p="1rem"
                                    sx={{ "&:hover": { cursor: "pointer" }, bgcolor: isDragActive ? "primary.mainGreenDark" : "primary.mainGreenLight" }}
                                >
                                    <input name="banner" {...getInputProps()} />
                                    {
                                        isDragActive ? (
                                            <>
                                                <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.themewhite", mr: 2 }} /></p>
                                                <p style={{ textAlign: "center", fontSize: "12px" }}> Drop here!</p>

                                            </>
                                        ) :

                                            values.image === null ?

                                                <>
                                                    <p style={{ textAlign: "center" }}><CloudUploadIcon sx={{ color: "primary.themewhite", mr: 2 }} /></p>
                                                    <p style={{ textAlign: "center", fontSize: "12px" }}>Drag and Drop image  here or click to choose</p>
                                                </> :



                                                <>
                                                    <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>

                                                        <Box ><img style={{ maxWidth: "100px" }} src={values.image} alt="" /></Box>
                                                    </Box>
                                                </>
                                            }
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <Button sx={{mt:2}}type='submit' variant="contained" color="success">
                                Add this quiz
                            </Button>
                            </Box>
                            </Box>
                            
                        </Form>
                    )
                }}
            
            </Formik>
        </>
    )
}

export default CreateQuiz
