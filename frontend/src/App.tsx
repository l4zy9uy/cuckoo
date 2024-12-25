// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import './styles/index.css';
import AppRoute from './routes/AppRoute';
import { BranchProvider } from './context/BranchContext';


const App: React.FC = () => {
    const location = useLocation();

    // Only show the Navbar on routes other than '/login'
    const isLoginPage = location.pathname === '/login';

    return (
        <BranchProvider>
            {!isLoginPage && <NavbarComponent />}
            <main className="p-4">
                <AppRoute />
            </main>
        </BranchProvider>
    );
};

const WrappedApp: React.FC = () => {
    return (
        <Router basename="/cuckoo">
            <App />
        </Router>
    );
};

export default WrappedApp;
