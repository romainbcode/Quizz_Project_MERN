import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography, IconButton } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';



const AdminDashboard = () => {

    const [quizs, setQuizs] = useState([]);

    const displayQuizs = async () => {
        try {
            const { data } = await axios.get('/api/quizs/show');
            setQuizs(data.quizs);
            console.log(data.quizs)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteQuizById = async (e, id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const { data } = await axios.delete(`/api/delete/quiz/${id}`);
                toast.success(data.message);
                displayQuizs();
            } catch (error) {
                toast.error(error);
            }
        }
    }

    useEffect(() => {
        displayQuizs();
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
                <label>{params.row.subheader}</label>
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
                params.row.questionAnswer.length + " questions(s)"
            )
        },
        {
            field: 'scores',
            headerName: 'scores',
            width: 150,
            renderCell:(params)=>(
                params.row.scores.length + " score(s)"
            )
        },
        {
            field: "Actions",
            width: 100,
            renderCell: (value) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Link to={`/admin/quiz/edit/${value.row._id}`}>
                        <IconButton aria-label="edit" >
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deleteQuizById(e, value.row._id)} >
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <>
        <Navbar titlePage={"Admin dashboard"}/>
            <Paper sx={{ bgcolor: "white", display:'flex', mt:10}} >
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
                        rows={quizs}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                    />
                </Box>
            </Paper>
            <Box sx={{display: "flex", justifyContent: "center", mt:2, mb:2 }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}><Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/quiz/create">Create Post</Link> </Button>
            </Box>

        </>
    )
}

export default AdminDashboard;