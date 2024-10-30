// /routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import  Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';
import Settings from '../pages/Settings.tsx';
import TableAndRoom from '../pages/TableAndRoom.tsx';
import Login from "@/components/Login.tsx";
import Products from "../pages/Products.tsx";
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tables" element={<TableAndRoom />} />
        <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />}/>
    </Routes>
);

export default AppRoutes;
