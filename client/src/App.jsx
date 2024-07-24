import { useState } from 'react'

import viteLogo from '/vite.svg'

import Navigation from './components/navigation/Navigation'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'


import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register'
import Login from './components/login/Login'
import About from './components/about/About'

import Add from './components/add/Add'
import RecepiesList from './components/recepes-list/Recepies-list'

function App() {


  return (
    <>
     <Navigation/>
                 <Routes>
                <Route path="/" element={<Content />} />
                 {/* 
                <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />  */}
                
                <Route path="/recipes" element={<RecepiesList />} />
                 <Route path="/add" element={<Add/>} />
                   <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
     
     {/* <Content/> */}
     <Footer/>
    </>
  )
}

export default App
