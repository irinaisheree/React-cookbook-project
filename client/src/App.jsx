import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/userContext'; 
import Navigation from './components/navigation/Navigation';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import About from './components/about/About';
import Add from './components/add/Add';

import RecipesList from './components/recipes-list/Recepies-list';
import RecipeDetails from './components/details/Details';
import Edit from './components/edit/Edit';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/protection/Protection';
import NotFound from './components/not-found/Not-found';


function App() {
    return (
        <>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route
                        path="/add"
                        element={
                            <ProtectedRoute>
                                <Add />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/recipes" element={<RecipesList />} />
                    <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
                    <Route path="/recipes/:recipeId/edit" 
                    element={
                      <ProtectedRoute>
                      <Edit />
                  </ProtectedRoute>
                    } 
                    />
                    <Route path="/profile" 
                    element={
                      <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
                    } 
                    />
                                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
            <Footer />
        </>
    );
}

export default App;
