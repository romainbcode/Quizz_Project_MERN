import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import CreateQuiz from './admin/CreateQuiz';
import AdminDashboard from './admin/AdminDashboard';



const App = () =>{
  return(
    <>
      <ToastContainer/>
      
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/admin/quiz/create' element={<CreateQuiz/>}></Route>
              <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider> 
    </>
  )
}

export default App
