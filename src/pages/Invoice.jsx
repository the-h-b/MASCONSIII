import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invoice.css';

const Invoice = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [discountType, setDiscountType] = useState('none');
  const [discountValue, setDiscountValue] = useState(0);
  
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  const goToFinancing = () => {
    navigate('/financing');
  };
  
  const goToInvoice = () => {
    navigate('/invoice');
  };
  
  const goToBankDetails = () => {
    navigate('/bank-details');
  };

  const addItem = () => {
    setItems([...items, { description: '', hsn: '', quantity: 1, rate: 0, tax: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'description' || field === 'hsn' ? value : parseFloat(value);
    setItems(updated);
  };

  const getSubtotal = () => {
    return items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  };

  const getTax = (type) => {
    const totalTax = items.reduce((acc, item) => {
      const taxAmount = item.quantity * item.rate * (item.tax / 100);
      return acc + taxAmount;
    }, 0);
    return type === 'cgst' || type === 'sgst' ? totalTax / 2 : totalTax;
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    if (discountType === 'percent') {
      return subtotal * (discountValue / 100);
    } else if (discountType === 'fixed') {
      return discountValue;
    }
    return 0;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const totalTax = getTax('total');
    const discount = getDiscount();
    return subtotal + totalTax - discount;
  };

  return (
    <div className="invoice-page">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-blue-600">MASCONSIII</div>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="#" onClick={(e) => { e.preventDefault(); goToDashboard(); }}>Dashboard</a>
          <a href="#" className="text-blue-600">Invoices</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToFinancing(); }}>Financing</a>
          <a href="#">Analytics</a>
          <a href="#" onClick={(e) => { e.preventDefault(); goToBankDetails(); }}>Bank Details</a>
          <a href="#">Settings</a>
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            <span>HARSH BHUTRA</span>
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">Pro</span>
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="avatar"
              className="w-5 h-5"
            />
          </div>
        </nav>
      </header>
      <div className="invoice-container">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Invoice Items</h2>
        </div>
        <button className="add-item-btn" onClick={addItem}>+ Add Item</button>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>HSN Code</th>
              <th>Quantity</th>
              <th>Rate (₹)</th>
              <th>Tax Rate (%)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td><input value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} /></td>
                <td><input value={item.hsn} onChange={e => updateItem(idx, 'hsn', e.target.value)} /></td>
                <td><input type="number" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} /></td>
                <td><input type="number" value={item.rate} onChange={e => updateItem(idx, 'rate', e.target.value)} /></td>
                <td><input type="number" value={item.tax} onChange={e => updateItem(idx, 'tax', e.target.value)} /></td>
                <td>₹{(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-footer">
          <div className="tax-discount">
            <label>Tax Type</label>
            <div className="tax-type-box">CGST/SGST</div>
            <small>Tax type is automatically determined based on client location.</small>
            <label>Discount Type</label>
            <select onChange={(e) => setDiscountType(e.target.value)}>
              <option value="none">None</option>
              <option value="percent">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <label>Discount Value</label>
            <input type="number" value={discountValue} onChange={e => setDiscountValue(parseFloat(e.target.value))} />
          </div>
          <div className="invoice-summary">
            <p>Subtotal: ₹{getSubtotal().toFixed(2)}</p>
            <p>Taxable Value: ₹{getSubtotal().toFixed(2)}</p>
            <p>CGST: ₹{getTax('cgst').toFixed(2)}</p>
            <p>SGST: ₹{getTax('sgst').toFixed(2)}</p>
            <h3>Total Amount: ₹{getTotal().toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-4">
          <button 
            onClick={goToDashboard}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => {
              // Save invoice logic would go here
              goToDashboard();
            }}
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
