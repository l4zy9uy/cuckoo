// src/App.tsx
import React from 'react';
import NavbarComponent from './components/Navbar';
import './styles/index.css';
import AppRoute from './routes/AppRoute';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <NavbarComponent />
            <main className="p-4">
                <AppRoute />
            </main>
        </Router>
    );
};

export default App;
