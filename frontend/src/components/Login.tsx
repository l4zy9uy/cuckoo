// src/LoginPage.js
import {Grid2, Typography, TextField, Button, Box} from '@mui/material';
import loginImage from '../assets/login_image.jpg';

const Login = () => {
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

                <Box component="form" sx={{width: '80%', maxWidth: '400px'}}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Username"
                        margin="normal"
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        fullWidth
                        placeholder="Password"
                        margin="normal"
                    />
                    <Button
                        variant="contained"
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
