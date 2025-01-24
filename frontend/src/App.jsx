// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router';
import Login from './pages/Login/Login';

const App = ()=>{
    return(
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    )
}

export default App
