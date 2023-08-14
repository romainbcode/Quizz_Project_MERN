import { Avatar, Box, useTheme, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import Button from '@mui/material/Button';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userSignUpAction } from '../redux/actions/userAction'
import Navbar from '../components/Navbar';
import { Formik, Form, Field } from 'formik';


const SignUp = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userSignUp } = useSelector(state => state.signUp);

    const validationSchema = yup.object({
        username:yup
            .string('Enter your username')
            .min(5, 'Username should have a minimum of 5 caracters')
            .max(15, 'Username should have a maximum of 15 caracters')
            .required('Username is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should have minimum of 8 characters')
            .required('Password is required'),
      });
      
    const initialValues = {
        username: '',
        email: '',
        password: ''
    }
      
    const onSubmit = (values) =>{
        dispatch(userSignUpAction(values));
        actions.resetForm();
        navigate('/signin');
    }

    const goSignIn = () =>{
        navigate('/signin')
    }

  return (
    <>
    <Navbar/>

    <Formik
        validationSchema= {validationSchema}
        onSubmit={onSubmit}
        initialValues= {initialValues}
    >
    {(formik)=>{
        const {values} = formik;
        return (
            <Form>
                <Box sx={{height: '100vh', bgcolor: "primary.greenLight",display: "flex", justifyContent: 'center', pt: 10}}>
                    <Box sx={{ height: '60vh', width: '40%', display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "primary.mainGreenDark", borderRadius: '10%', boxShadow: '0 3px 10px #000' }}>
                        <Box className='form_style border-style' sx={{width: '70%'}} >
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                <Avatar sx={{ m: 1, bgcolor: "primary.greenDark", mb: 3 }}>
                                    <LockClockOutlined />
                                </Avatar>
                                <Field
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'primary.themewhite',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    label="Username"
                                    name='username'
                                    placeholder="Username"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                            color: "primary.themewhite"
                                        }
                                    }}
                                    as={TextField}
                                />
                                <Field
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'primary.themewhite',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    label="E-mail"
                                    name='email'
                                    placeholder="E-mail"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                            color: "primary.themewhite"
                                        }
                                    }}
                                    as={TextField}
                                />
                                <Field
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'primary.themewhite'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                            color: "primary.themewhite"
                                        }
                                    }}
                                    placeholder="Password"
                                    as={TextField}
                                />
                                <Button  fullWidth variant="contained" type='submit' >
                                    Sign Up
                                </Button>
                                <Box sx={{display:'flex', textAlign:'left', justifyContent:'left', width:'100%', p:0, m:0, mt:1}}>
                                    <Button onClick={goSignIn} sx={{textDecoration: 'underline'}}>
                                        Already register ? Log in !
                                    </Button>
                                </Box>
                                

                                
                            </Box>
                        </Box>
                        
                    </Box>
                    
                </Box>
                
            </Form>
            

        )
        }}
      
    </Formik>
    </>
  )
}

export default SignUp
