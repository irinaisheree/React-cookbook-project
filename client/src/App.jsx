import { useState } from 'react'

import viteLogo from '/vite.svg'

import Navigation from './components/navigation/Navigation'
import Content from './components/content/Content'
import Footer from './components/footer/Footer'


import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register'

function App() {


  return (
    <>
     <Navigation/>
                 <Routes>
                <Route path="/" element={<Content />} />
                {/* <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/add" element={<Add />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={<Register />} />
            </Routes>
     
     <Content/>
     <Footer/>
    </>
  )
}

export default App
