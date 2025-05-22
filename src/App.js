import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicDetails from './pages/BasicDetails.jsx';
import BasicDetails1 from './pages/BasicDetails-1.jsx';
import GSTSelection from './pages/SelectGST.jsx';
import SelectGST2 from './pages/SelectGST2.jsx';
import EntityDetails from './pages/EntityDetail';
import EntityDetail1 from './pages/EntityDetail1.jsx';
import EntityDetail2 from './pages/EntityDetail2.jsx';
import BankDetails from './pages/BankDetails.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicDetails />} />
        <Route path="/basic-details1" element={<BasicDetails1 />} />
        <Route path="/gst-selection" element={<GSTSelection />} />
        <Route path="/select-gst2" element={<SelectGST2 />} />
        <Route path="/entity-detail" element={<EntityDetails />} />
        <Route path="/entity-detail1" element={<EntityDetail1 />} />
        <Route path="/entity-detail2" element={<EntityDetail2 />} />
        <Route path="/entity-detail2" element={<EntityDetail2 />} />
        <Route path="/bank-details" element={<BankDetails />} />
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
