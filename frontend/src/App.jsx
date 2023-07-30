import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';


const App = () =>{
  return(
    <>
      <ToastContainer/>
      
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider> 
    </>
  )
}

export default App
