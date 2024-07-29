import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Dashboard from './Pages/Dashboard'
import PostApplication from './Pages/PostApplication'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PageNotFound from './Pages/PageNotFound'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/useSlice'
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/post/application/:jobId' element={<PostApplication />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />

        </Routes>
        <Footer />
        <ToastContainer position='top-right' theme='dark' />
      </Router>

    </>
  )
}

export default App
