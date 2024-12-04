// src/LoginPage.js
import {Grid2, Typography, TextField, Button, Box} from '@mui/material';
import loginImage from '../assets/login_image.jpg';
import axios from 'axios';
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

// Define the types for the state
interface LoginFormData {
    username: string;
    password: string;
    errorMessage: string;
}

const Login = () => {

    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
        errorMessage: ''
    });

    const navigate = useNavigate();

    // Handle form submission
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Make the API call to the backend for authentication
            console.log(formData);
            const response = await axios.post('http://localhost:3001/api/auth/signin', {
                username: formData.username,
                password: formData.password,
            });

            // If successful, store the user data or token as needed
            const { data } = response;
            console.log('Login successful', data);

            // For example, you might store the token in localStorage or in a context
            localStorage.setItem('token', data.token);

            navigate('/'); // This will redirect to the root page

        } catch (error) {
            // Handle error
            console.error('Login failed', error);
            setFormData(prev => ({
                ...prev,
                errorMessage: 'Invalid credentials, please try again.'
            }));
        }
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(e);
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Grid2
            container
            sx={{
                minHeight: '100vh',
                justifyContent: 'space-around',
                flex: 1,
            }}
        >
            {/* Left Side - Login Form */}
            <Grid2
                sx={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    LOGIN
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    How to get started lorem ipsum dolor at?
                </Typography>

                <Box component="form" sx={{width: '80%', maxWidth: '400px'}} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Username"
                        margin="normal"
                        name="username"
                        onChange={handleChange}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        fullWidth
                        placeholder="Password"
                        margin="normal"
                        name="password"
                        onChange={handleChange}
                    />

                    {formData.errorMessage && (
                        <Typography color="error" sx={{ marginTop: '1rem' }}>
                            {formData.errorMessage}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{
                            marginTop: '1rem',
                            background: 'primary.main',
                            color: '#ff',
                        }}
                    >
                        Login Now
                    </Button>
                </Box>
            </Grid2>

            {/* Right Side - Promotional Content */}
            <Grid2
                sx={{
                    //background: 'linear-gradient(to right, #7B61FF, #9B33FF)',
                    backgroundImage: `url(${loginImage})`, // Use template literal correctly
                    backgroundSize: 'cover',               // Ensure the image covers the entire area
                    backgroundPosition: 'center',          // Center the image
                    backgroundRepeat: 'no-repeat',         // Avoid repetition
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}

            >

            </Grid2>
        </Grid2>
    );
};

export default Login;
