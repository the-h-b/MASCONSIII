import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ScatterChart, Scatter, ZAxis
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth';

// Sample data for fraud detection over time
const fraudDetectionData = [
  { month: 'Jan', detected: 120, prevented: 110, losses: 10 },
  { month: 'Feb', detected: 150, prevented: 140, losses: 10 },
  { month: 'Mar', detected: 180, prevented: 165, losses: 15 },
  { month: 'Apr', detected: 210, prevented: 190, losses: 20 },
  { month: 'May', detected: 240, prevented: 220, losses: 20 },
  { month: 'Jun', detected: 270, prevented: 250, losses: 20 },
  { month: 'Jul', detected: 300, prevented: 280, losses: 20 },
];

// Sample data for fraud types distribution
const fraudTypesData = [
  { name: 'Card Not Present', value: 45 },
  { name: 'Counterfeit Card', value: 20 },
  { name: 'Lost/Stolen Card', value: 15 },
  { name: 'Account Takeover', value: 10 },
  { name: 'Identity Theft', value: 8 },
  { name: 'Other', value: 2 },
];

// Sample data for fraud by merchant category
const fraudByMerchantData = [
  { category: 'E-commerce', fraudCount: 150 },
  { category: 'Travel', fraudCount: 80 },
  { category: 'Entertainment', fraudCount: 70 },
  { category: 'Retail', fraudCount: 60 },
  { category: 'Restaurants', fraudCount: 40 },
  { category: 'Gas Stations', fraudCount: 30 },
  { category: 'Other', fraudCount: 20 },
];

// Sample data for transaction risk assessment
const riskAssessmentData = [
  { x: 100, y: 200, z: 200, name: 'Transaction A' },
  { x: 120, y: 100, z: 260, name: 'Transaction B' },
  { x: 170, y: 300, z: 400, name: 'Transaction C' },
  { x: 140, y: 250, z: 280, name: 'Transaction D' },
  { x: 150, y: 400, z: 500, name: 'Transaction E' },
  { x: 110, y: 280, z: 200, name: 'Transaction F' },
];

// Sample data for fraud alerts list
const fraudAlertsData = [
  { id: 1, date: '15/07/2025, 14:22', cardNumber: '4567 XXXX XXXX 7890', amount: '₹15,000', merchant: 'Online Electronics Store', type: 'Card Not Present', status: 'Investigating', riskScore: 85 },
  { id: 2, date: '15/07/2025, 10:15', cardNumber: '5678 XXXX XXXX 8901', amount: '₹8,500', merchant: 'International Travel Agency', type: 'Unusual Location', status: 'Confirmed Fraud', riskScore: 92 },
  { id: 3, date: '14/07/2025, 23:45', cardNumber: '6789 XXXX XXXX 9012', amount: '₹12,000', merchant: 'Online Gaming Platform', type: 'Unusual Activity', status: 'False Positive', riskScore: 75 },
  { id: 4, date: '14/07/2025, 18:30', cardNumber: '7890 XXXX XXXX 0123', amount: '₹5,000', merchant: 'Jewelry Store', type: 'Card Not Present', status: 'Confirmed Fraud', riskScore: 88 },
  { id: 5, date: '14/07/2025, 15:10', cardNumber: '8901 XXXX XXXX 1234', amount: '₹25,000', merchant: 'Electronics Store', type: 'Multiple Attempts', status: 'Investigating', riskScore: 80 },
  { id: 6, date: '14/07/2025, 12:05', cardNumber: '9012 XXXX XXXX 2345', amount: '₹3,500', merchant: 'Gas Station', type: 'Counterfeit Card', status: 'Confirmed Fraud', riskScore: 95 },
  { id: 7, date: '13/07/2025, 22:18', cardNumber: '0123 XXXX XXXX 3456', amount: '₹7,800', merchant: 'Online Clothing Store', type: 'Card Not Present', status: 'False Positive', riskScore: 70 },
  { id: 8, date: '13/07/2025, 16:45', cardNumber: '1234 XXXX XXXX 4567', amount: '₹9,200', merchant: 'Restaurant', type: 'Lost/Stolen Card', status: 'Investigating', riskScore: 82 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000'];

const FraudManagement = () => {
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [newRule, setNewRule] = useState({
    ruleName: '',
    ruleType: 'Transaction Limit',
    threshold: '',
    action: 'Block Transaction'
  });

  const handleAddRule = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    customAlert('New fraud rule added successfully!');
    setShowRuleModal(false);
    // Reset form
    setNewRule({
      ruleName: '',
      ruleType: 'Transaction Limit',
      threshold: '',
      action: 'Block Transaction'
    });
  };

  return (
    <AdminLayout title="Fraud Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Fraud Management</h2>
        <button 
          onClick={() => setShowRuleModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          Add Fraud Rule
        </button>
      </div>

      {/* Fraud Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Fraud Attempts Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <div>
            <p className="text-gray-500 text-base">Total Fraud Attempts</p>
            <p className="text-3xl font-bold text-gray-900">1,470</p>
          </div>
          <div className="bg-red-100 p-4 rounded-full">
            <svg className="h-7 w-7 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Prevented Fraud Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <div>
            <p className="text-gray-500 text-base">Prevented Fraud</p>
            <p className="text-3xl font-bold text-gray-900">1,355</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full">
            <svg className="h-7 w-7 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Financial Loss Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <div>
            <p className="text-gray-500 text-base">Financial Loss</p>
            <p className="text-3xl font-bold text-gray-900">₹115,000</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-full">
            <svg className="h-7 w-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Fraud Detection Rate Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
          <div>
            <p className="text-gray-500 text-base">Detection Rate</p>
            <p className="text-3xl font-bold text-gray-900">92.2%</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-full">
            <svg className="h-7 w-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Fraud Detection Over Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fraud Detection Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={fraudDetectionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="detected" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                  name="Detected Fraud"
                />
                <Line 
                  type="monotone" 
                  dataKey="prevented" 
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                  name="Prevented Fraud"
                />
                <Line 
                  type="monotone" 
                  dataKey="losses" 
                  stroke="#ff7300" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                  name="Financial Losses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Types Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fraud Types Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud by Merchant Category */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Fraud by Merchant Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fraudByMerchantData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="fraudCount" name="Fraud Count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Risk Assessment */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Transaction Risk Assessment</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Transaction Amount" 
                  unit="₹" 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Risk Score" 
                  unit="" 
                  axisLine={false} 
                  tickLine={false}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[60, 400]} 
                  name="Velocity" 
                  unit="" 
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter 
                  name="Transactions" 
                  data={riskAssessmentData} 
                  fill="#8884d8" 
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Fraud Alerts Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recent Fraud Alerts</h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Statuses</option>
              <option value="Investigating">Investigating</option>
              <option value="Confirmed Fraud">Confirmed Fraud</option>
              <option value="False Positive">False Positive</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Card Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fraud Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fraudAlertsData.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.cardNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.merchant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.riskScore >= 90 ? 'bg-red-100 text-red-800' : 
                        alert.riskScore >= 80 ? 'bg-orange-100 text-orange-800' : 
                        alert.riskScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === 'Investigating' ? 'bg-yellow-100 text-yellow-800' : 
                      alert.status === 'Confirmed Fraud' ? 'bg-red-100 text-red-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Details</button>
                      <button className="text-red-600 hover:text-red-900">Block Card</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
          <span className="mr-2">Showing 1-8 of 1,470</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out">{'<'}</button>
            {[1, 2, 3, 4, 5].map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded-md transition duration-200 ease-in-out ${page === 1 ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out">{'>'}</button>
          </div>
        </div>
      </div>

      {/* Add Fraud Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Fraud Rule</h3>
            <form onSubmit={handleAddRule}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ruleName">
                  Rule Name
                </label>
                <input
                  id="ruleName"
                  type="text"
                  value={newRule.ruleName}
                  onChange={(e) => setNewRule({...newRule, ruleName: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter rule name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ruleType">
                  Rule Type
                </label>
                <select
                  id="ruleType"
                  value={newRule.ruleType}
                  onChange={(e) => setNewRule({...newRule, ruleType: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Transaction Limit">Transaction Limit</option>
                  <option value="Geographical Restriction">Geographical Restriction</option>
                  <option value="Merchant Category">Merchant Category</option>
                  <option value="Velocity Check">Velocity Check</option>
                  <option value="Time of Day">Time of Day</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="threshold">
                  Threshold/Value
                </label>
                <input
                  id="threshold"
                  type="text"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({...newRule, threshold: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter threshold value"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="action">
                  Action
                </label>
                <select
                  id="action"
                  value={newRule.action}
                  onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Block Transaction">Block Transaction</option>
                  <option value="Flag for Review">Flag for Review</option>
                  <option value="Send Alert">Send Alert</option>
                  <option value="Require 2FA">Require 2FA</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRuleModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Add Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default FraudManagement;