import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import { Checkbox } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';





const EditQuiz = () => {
    const [title, setTitle] = useState('');
    const [subheader, setSubheader] = useState('');
    const [questionAnswer, setQuestionAnswer] = useState([]);
    const [image, setImage] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const initialValues = {
        title,
        subheader,
        image: '',
        questionAnswer
    };

    const onSubmit = (values) =>{
        updatePost(values)
    }

    const validationSchema = yup.object({
        title: yup
            .string('Add a post title')
            .min(4, 'Title content should have a minimum of 4 characters.')
            .required('Title content is required'),
        subheader: yup
            .string('Add text content')
            .min(10, 'Subheader content should have a minimum of 10 characters.')
            .required('Subheader content is required'),
        questionAnswer : yup.array(
            yup.object({
                question: yup
                .string('Add a question')
                .min(10, 'Question should have a minimum of 10 characters.'),
                answer : yup.array(
                    yup.object({
                        answerText: yup
                        .string('Add an answer')
                        .min(3, 'Answer should have a minimum of 10 characters '),
                        stateAnswer: yup
                        .boolean('Declare False or True')
                    })
                )
                .min(2, 'You must add a minimum of 2 answer.')
            })
        )
    });
    
    const showSinglePostById = async () => {
        try {
            const { data } = await axios.get(`/api/quiz/show/${id}`);
            setTitle(data.quiz.title)
            setSubheader(data.quiz.subheader)
            setQuestionAnswer(data.quiz.questionAnswer)
            setImage(data.quiz.image.url)
        } catch (error) {
            toast.error(error);
        }
    }

    const updatePost = async (values) => {
        try {
            const { data } = await axios.put(`/api/update/quiz/${id}`, values);
            toast.success('quiz updated');
            navigate('/admin/dashboard')
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        showSinglePostById()
    }, [])
    

    return (
        <>
        <Navbar/>
        <Formik 
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
            enableReinitialize={true}
        >
            {(formik)=>{
            const {values, errors, touched } = formik;
            return(
                <Form>
                    <Box sx={{ bgcolor: "primary.greenLight", height:'100vh', width:'100%', display: "flex", justifyContent: 'center', pt: 3}}>
                    <Box sx={{ bgcolor: "primary.mainGreenDark",height: 'fit-content', width:'85%', mb:2, padding: 5, borderRadius: '10px', boxShadow: '0 3px 10px #000' }}>
                        <Typography variant='h5' sx={{ pb: 4, color: 'primary.themewhite'}}> Create Quiz  </Typography>
                        <Box sx={{mt:1}} component="form">
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} width={'100%'} marginBottom={3}>
                                <Field
                                    sx={{width: '50%',
                                    fieldset: { borderColor: "primary.themewhite" }
                                }}
                                    autoComplete="off"
                                    id="title"
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
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}     
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
                                    value={values.subheader}
                                    error={touched.subheader && Boolean(errors.subheader)}
                                    helperText={touched.subheader && errors.subheader}  
                                />  
                            </Stack>
                        </Box>
                        <FieldArray
                            type="questionAnswer"
                            name="questionAnswer"
                            id="questionAnswer"
                            value={values.questionAnswer}
                            render={(arrayQuestion)=>(
                                <Box className='formContainer' sx={{backgroundColor: 'primary.mainGreenLight', padding: 3, mb: 2, borderRadius: '10px', boxShadow: '0 3px 10px #000'}}>
                                    {values.questionAnswer.map((arrayMapQuestion, index)=>(
                                        <div className="formContainer" style={{display:'flex',flexDirection:'column', alignItems:'center', marginBottom: '20px'}} key={index}>
                                            <Box style={{width: '100%', display:'flex', flexDirection:'row', height:'100%', marginBottom:'10px'}}>
                                                <Box sx={{display:'flex', alignItems:'center', width: '100%'}}>
                                                    <Field
                                                        sx={{width: '100%', fieldset: { borderColor: "primary.themewhite"}}}
                                                        name={`questionAnswer.${index}.question`}
                                                        placeholder="Question text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            sx: {
                                                                color: "primary.themewhite"
                                                            }
                                                        }}
                                                        label={`Question : ${index}`}
                                                        as={TextField}
                                                    />
                                                </Box>
                                                <Box style={{marginLeft: 10, display:'flex', alignItems:'center'}}>
                                                    <Button variant="contained" color="error"
                                                        sx={{width: '100%', height: '75%' }}
                                                        onClick={() => arrayQuestion.remove(index)}
                                                        startIcon={<DeleteIcon/>}
                                                    >
                                                    Delete this question
                                                    </Button>
                                                </Box> 
                                            </Box>
                                            
                                        
                                            <FieldArray
                                            type={`questionAnswer.${index}.answer`}
                                            name={`questionAnswer.${index}.answer`}
                                            id={`questionAnswer.${index}.answer`}
                                            value={values.questionAnswer[index].answer}
                                            render={(arrayAnswer)=>(
                                                <Box className='formContainer' style={{width: '100%'}}>
                                                    {values.questionAnswer[index].answer.map((TestCase2, index2) => (
                                                            <div style={{width: '90%', display: 'flex', flexDirection: 'row', float: 'right', marginBottom:'10px'}} key={index2}>
                                                                <Box sx={{width:'100%', alignItems:'center', display:'flex'}}>
                                                                    <Field
                                                                        sx={{width: '100%', fieldset: { borderColor: "primary.themewhite"} }}
                                                                        name={`questionAnswer.${index}.answer.${index2}.answerText`}
                                                                        placeholder="Answer text"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                            sx: {
                                                                                color: "primary.themewhite"
                                                                            }
                                                                        }}
                                                                        label={`Question : ${index}, Answer : ${index2}`}
                                                                        as={TextField}
                                                                    />
                                                                </Box>
                                                                <Box style={{marginLeft:'10px', marginRight: '10px', display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                                                    <Field
                                                                        sx={{height:'20px', width:'20px', alignItems:'center', mr:1,
                                                                        color: 'primary.themewhite', display:'flex', justifyContent:'center'
                                                                    }}
                                                                        name={`questionAnswer.${index}.answer.${index2}.stateAnswer`}
                                                                        as={Checkbox}
                                                                    />
                                                                    True/False
                                                                </Box>
                                                                <Box style={{width: "31%", display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                                    <Button variant="contained" color="error"
                                                                        sx={{width: '100%', height: '75%' }}
                                                                        onClick={() => arrayAnswer.remove(index2)}
                                                                        startIcon={<DeleteIcon />}
                                                                    >
                                                                    Delete this answer
                                                                    </Button>
                                                                </Box> 
                                                            </div>
                                                    ))}
                                                    <Button variant="contained" 
                                                        onClick={() => {
                                                            arrayAnswer.push({answerText: '',stateAnswer: false})
                                                        }}
                                                        sx={{width: '25%', height: '50%', bgcolor:"#dad7cd"}}
                                                        endIcon={<AddIcon />}
                                                    >
                                                        Add an answer
                                                    </Button>
                                                </Box>
                                                    
                                            )}
                                            
                                            />

                                        </div>

                                        
                                    ))}
                                    <Button variant="contained" 
                                        onClick={() => {
                                            arrayQuestion.push({question: '',
                                            answer:[{
                                                answerText : '',
                                                stateAnswer : false
                                            }]
                                        })}}
                                        sx={{width: '25%', height: '50%', mb:2, bgcolor:"#dad7cd"}}
                                        endIcon={<AddIcon />}
                                        
                                    >
                                    Add a question
                                    </Button>
                                </Box>
                            )}
                        />
                        


                    <Box border='2px dashed white' sx={{ p: 1, borderRadius: '10px', boxShadow: '0 3px 10px #000'}}>
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

                                                        <Box ><img style={{ maxWidth: "100px" }} src={values.image === '' ? image : values.image} alt="" /></Box>
                                                    </Box>
                                                </>
                                            }
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <Button sx={{mt:2}} type='submit' variant="contained" color="success">
                                Update this quiz
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

export default EditQuiz
