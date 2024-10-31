// /routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import TableAndRoom from '../pages/TableAndRoom';
import Login from '@/components/Login';
import ProductsPage from '../pages/ProductsPage';
import PriceBookPage from '../pages/PriceBookPage';
import StockTakesPage from '../pages/StockTakesPage';
import InvoicesPage from '../pages/InvoicesPage';
import PurchaseOrderPage from '../pages/PurchaseOrderPage';
import EmployeesPage from '../pages/EmployeesPage';
import TimesheetPage from '../pages/TimesheetPage';
import EmployerSettingsPage from '../pages/EmployerSettingsPage';
import CustomersPage from '../pages/CustomersPage';
import SuppliersPage from '../pages/SuppliersPage';
import CashierPage from '../pages/CashierPage';
import ReportsPage from '../pages/ReportsPage';
import KitchenPage from '../pages/KitchenPage';
import ReceptionPage from '../pages/ReceptionPage';
import BranchManagementPage from '../pages/BranchManagementPage';
import OperationHistoryPage from '../pages/OperationHistoryPage';
import PosSettingsPage from "@/pages/PosSettingsPage.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/tables" element={<TableAndRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/pricebook" element={<PriceBookPage />} />
        <Route path="/stocktakes" element={<StockTakesPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/purchaseorder" element={<PurchaseOrderPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/timesheet" element={<TimesheetPage />} />
        <Route path="/employersettings" element={<EmployerSettingsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/cashier" element={<CashierPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/reception" element={<ReceptionPage />} />
        <Route path="/possettings" element={<PosSettingsPage />} />
        <Route path="/branchmanagement" element={<BranchManagementPage />} />
        <Route path="/operationhistory" element={<OperationHistoryPage />} />
    </Routes>
);

export default AppRoutes;
