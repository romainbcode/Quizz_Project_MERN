import { Avatar, Box, useTheme, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import Button from '@mui/material/Button';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userSignInAction } from '../redux/actions/userAction'
import Navbar from '../components/Navbar';
import { Formik, Form, Field } from 'formik';


const SignIn = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, userInfo } = useSelector(state => state.signIn);

    const validationSchema = yup.object({
       email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
      });
      
    const initialValues = {
        email: '',
        password: ''
    }
      
    const onSubmit = (values) =>{
        //alert(JSON.stringify(values, null, 2));

        dispatch(userSignInAction(values));
        actions.resetForm();
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated])

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
                        <Box className='form_style border-style' >
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
                                <Button disabled={loading} fullWidth variant="contained" type='submit' >
                                    LogIn
                                </Button>
                                

                                
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

export default SignIn
