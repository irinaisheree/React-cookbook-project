import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/userContext'; // Correct path

import Navigation from './components/navigation/Navigation';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import About from './components/about/About';
import Add from './components/add/Add';
// import RecepiesList from './components/recepes-list/Recepies-list';

function App() {
    return (
        <AuthProvider>
            <Navigation />
            <Routes>
                <Route path="/" element={<Content />} />
                {/* <Route path="/recipes" element={<RecepiesList />} /> */}
                <Route path="/add" element={<Add />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;
