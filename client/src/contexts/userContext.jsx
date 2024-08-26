import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user data from localStorage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        let storedUser = null;

        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                storedUser = JSON.parse(userData); // Parse user data
            }
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            storedUser = null; // Reset user data if parsing fails
        }

        if (token && storedUser) {
            setUser(storedUser); // Set user from localStorage if valid
        }

    }, []);

    // Login function to set user and token in state and localStorage
    const login = (userData, token) => {
        if (userData) {
            localStorage.setItem('token', token); // Store token
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data
            setUser(userData); // Update user state
        }
    };

    // Logout function to clear user and token from state and localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('user'); // Remove user data
    };

    // Check if user is logged in
    const isLoggedIn = !!user;

    // Check if current user is the owner of a resource
    const isOwner = (creatorEmail) => {
        return user?.email === creatorEmail;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isOwner }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
