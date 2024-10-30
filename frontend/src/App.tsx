// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import './styles/index.css';
import AppRoute from './routes/AppRoute';

const App: React.FC = () => {
    const location = useLocation();

    // Only show the Navbar on routes other than '/login'
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <NavbarComponent />}
            <main className="p-4">
                <AppRoute />
            </main>
        </>
    );
};

const WrappedApp: React.FC = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default WrappedApp;
