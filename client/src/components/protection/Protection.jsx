import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/userContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); 

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />; 
    }

    return children; //components
};

export default ProtectedRoute;