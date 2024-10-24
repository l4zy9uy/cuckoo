// src/App.tsx
import React from 'react';
import NavbarComponent from './components/Navbar';
import './styles/index.css';
import {TopMenu} from "@/components/TopBar.tsx"; // Optional Tailwind usage

const App: React.FC = () => {
    return (
        <div className="h-screen">
            <NavbarComponent />
            <main className="p-4">
                <h1 className="text-2xl font-bold">Welcome to Cuckoo</h1>
            </main>
        </div>
    );
};

export default App;
