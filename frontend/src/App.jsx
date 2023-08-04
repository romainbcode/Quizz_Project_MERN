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
import SignIn from './pages/SignIn';
import store from './redux/store'
import SignUp from './pages/SignUp';
import SinglePost from './pages/SingleQuiz';


const App = () =>{
  return(
    <>
      <ToastContainer/>
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/signin' element={<SignIn/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>
              <Route path='/quiz/show/:id' element={<SinglePost/>}></Route>
              <Route path='/admin/quiz/create' element={<CreateQuiz/>}></Route>
              <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider> 
      </Provider>
    </>
  )
}

export default App
