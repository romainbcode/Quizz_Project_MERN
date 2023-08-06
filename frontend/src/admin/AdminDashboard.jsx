import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography, autocompleteClasses } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment'
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';



const AdminDashboard = () => {

    const [posts, setPosts] = useState([]);

    const displayPost = async () => {
        console.log("okok")
        try {
            const { data } = await axios.get('/api/quizs/show');
            setPosts(data.quizs);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayPost();
    }, [])


    const columns = [

        {
            field: '_id',
            headerName: 'Post ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Post title',
            width: 150,
        },
        {
            field: 'subheader',
            headerName: 'Post subheader',
            width: 150,
            renderCell: (params)=>(
                <label style={{color: 'red'}}>{params.row.subheader}</label>
            )
        },

        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img width="100px" src={params.row.image.url} />
            )

        },
        {
            field: 'questionAnswers',
            headerName: 'Question',
            width: 150,
            renderCell: (params) => (
                params.row.questionAnswer.question
            )
        },
        {
            field: 'questionAnswer',
            headerName: 'answer',
            autoHeight: true,
            autoWidth:true,
            width: 350,
            valueGetter:(params)=>{
                var text = ""
                for (let i = 0; i < params.row.questionAnswer.length; i++) {
                    for(let j =0; j<params.row.questionAnswer[i].answer.length; j++){
                        text = text + " question : " + params.row.questionAnswer[i].question + " answer : " + params.row.questionAnswer[i].answer[j].stateAnswer + <br/>

                    }

                }
                return text
                }
                
            

            
            //params.row.questionAnswer.answer[0].answerText; 
            //console.log(params.value.answer)
            //
    
            
        }
        
        
        
        
    ];


    return (
        <Box >
        <Navbar/>
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Posts
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}><Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/quiz/create">Create Post</Link> </Button>
            </Box>
            <Paper sx={{ bgcolor: "white" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: "white"
                            },
                        }}
                        rows={posts}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default AdminDashboard;