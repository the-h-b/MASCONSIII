import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import BasicDetails from './pages/BasicDetails.jsx';
import BasicDetails1 from './pages/BasicDetails-1.jsx';
import GSTSelection from './pages/SelectGST.jsx';
import SelectGST2 from './pages/SelectGST2.jsx';
import EntityDetails from './pages/EntityDetail';
import EntityDetail1 from './pages/EntityDetail1.jsx';
import EntityDetail2 from './pages/EntityDetail2.jsx';
import BankDetails from './pages/BankDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Invoice from './pages/Invoice.jsx';
import FinancingMain from './pages/FinancingMain.jsx';
import PaymentMethods from './pages/PaymentMethods.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// admin pages
// import MasterBIN from './pages/MasterBIN.jsx';
// import MasterClients from './pages/MasterClients.jsx';
// import BINSetup from './pages/BINSetup.jsx';
// import EmbosserLogo from './pages/EmbosserLogo.jsx';
import Program from './pages/Program.jsx';
import Clients from './pages/Clients.jsx';
import ClientPrefund from './pages/ClientPrefund.jsx';
import Customers from './pages/Customers.jsx';
import Cards from './pages/Cards.jsx';
import FraudManagement from './pages/FraudManagement.jsx';
import LoyaltyManagement from './pages/LoyaltyManagement.jsx';
import BulkUploads from './pages/BulkUploads.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

// Supply Chain Financing Platform pages
import ProgramManagement from './pages/ProgramManagement.jsx';
import AnchorManagement from './pages/AnchorManagement.jsx';
import LenderManagement from './pages/LenderManagement.jsx';
import ClientManagement from './pages/ClientManagement.jsx';
import AdminControls from './pages/AdminControls.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        
        {/* User Routes */}
        <Route path="/basic-details" element={
          <ProtectedRoute requiredRole="user">
            <BasicDetails />
          </ProtectedRoute>
        } />
        <Route path="/basic-details1" element={
          <ProtectedRoute requiredRole="user">
            <BasicDetails1 />
          </ProtectedRoute>
        } />
        <Route path="/gst-selection" element={
          <ProtectedRoute requiredRole="user">
            <GSTSelection />
          </ProtectedRoute>
        } />
        <Route path="/select-gst2" element={
          <ProtectedRoute requiredRole="user">
            <SelectGST2 />
          </ProtectedRoute>
        } />
        <Route path="/entity-detail" element={
          <ProtectedRoute requiredRole="user">
            <EntityDetails />
          </ProtectedRoute>
        } />
        <Route path="/entity-detail1" element={
          <ProtectedRoute requiredRole="user">
            <EntityDetail1 />
          </ProtectedRoute>
        } />
        <Route path="/entity-detail2" element={
          <ProtectedRoute requiredRole="user">
            <EntityDetail2 />
          </ProtectedRoute>
        } />
        <Route path="/bank-details" element={
          <ProtectedRoute requiredRole="user">
            <BankDetails />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="user">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/invoice" element={
          <ProtectedRoute requiredRole="user">
            <Invoice />
          </ProtectedRoute>
        } />
        <Route path="/financing" element={
          <ProtectedRoute requiredRole="user">
            <FinancingMain />
          </ProtectedRoute>
        } />
        <Route path="/payment-methods" element={
          <ProtectedRoute requiredRole="user">
            <PaymentMethods />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        {/* <Route path="/master-bin" element={
          <ProtectedRoute requiredRole="admin">
            <MasterBIN />
          </ProtectedRoute>
        } />
        <Route path="/master-clients" element={
          <ProtectedRoute requiredRole="admin">
            <MasterClients />
          </ProtectedRoute>
        } />
        <Route path="/bin-setup" element={
          <ProtectedRoute requiredRole="admin">
            <BINSetup />
          </ProtectedRoute>
        } />
        <Route path="/embosser-logo" element={
          <ProtectedRoute requiredRole="admin">
            <EmbosserLogo />
          </ProtectedRoute>
        } /> */}
        <Route path="/program" element={
          <ProtectedRoute requiredRole="admin">
            <Program />
          </ProtectedRoute>
        } />
        <Route path="/clients" element={
          <ProtectedRoute requiredRole="admin">
            <Clients />
          </ProtectedRoute>
        } />
        <Route path="/client-prefund" element={
          <ProtectedRoute requiredRole="admin">
            <ClientPrefund />
          </ProtectedRoute>
        } />
        <Route path="/customers" element={
          <ProtectedRoute requiredRole="admin">
            <Customers />
          </ProtectedRoute>
        } />
        <Route path="/cards" element={
          <ProtectedRoute requiredRole="admin">
            <Cards />
          </ProtectedRoute>
        } />
        <Route path="/fraud-management" element={
          <ProtectedRoute requiredRole="admin">
            <FraudManagement />
          </ProtectedRoute>
        } />
        <Route path="/loyalty-management" element={
          <ProtectedRoute requiredRole="admin">
            <LoyaltyManagement />
          </ProtectedRoute>
        } />
        <Route path="/bulk-uploads" element={
          <ProtectedRoute requiredRole="admin">
            <BulkUploads />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="admin">
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <Settings />
          </ProtectedRoute>
        } />
        
        {/* Supply Chain Financing Platform Routes */}
        <Route path="/programs" element={
          <ProtectedRoute requiredRole="admin">
            <ProgramManagement />
          </ProtectedRoute>
        } />
        <Route path="/anchors" element={
          <ProtectedRoute requiredRole="admin">
            <AnchorManagement />
          </ProtectedRoute>
        } />
        <Route path="/lenders" element={
          <ProtectedRoute requiredRole="admin">
            <LenderManagement />
          </ProtectedRoute>
        } />
        <Route path="/financing-clients" element={
          <ProtectedRoute requiredRole="admin">
            <ClientManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin-tools" element={
          <ProtectedRoute requiredRole="admin">
            <AdminControls />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
