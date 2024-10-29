// /routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import  Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';
import Settings from '../pages/Settings.tsx';
import Tables from '../pages/Tables.tsx';
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tables" element={<Tables />} />
    </Routes>
);

export default AppRoutes;
