import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { useSignOut } from '../utils/auth';

const transactionVolumeData = [
  { name: 'Monday', 'Transaction Volume': 1000 },
  { name: 'Tuesday', 'Transaction Volume': 3000 },
  { name: 'Wednesday', 'Transaction Volume': 5000 },
  { name: 'Thursday', 'Transaction Volume': 2500 },
  { name: 'Friday', 'Transaction Volume': 1800 },
  { name: 'Saturday', 'Transaction Volume': 1500 },
  { name: 'Sunday', 'Transaction Volume': 2200 },
];

const revenueGrowthData = [
  { name: 'January', 'Revenue Growth (INR)': 12000 },
  { name: 'February', 'Revenue Growth (INR)': 15000 },
  { name: 'March', 'Revenue Growth (INR)': 13000 },
  { name: 'April', 'Revenue Growth (INR)': 20000 },
  { name: 'May', 'Revenue Growth (INR)': 28000 },
  { name: 'June', 'Revenue Growth (INR)': 35000 },
  { name: 'July', 'Revenue Growth (INR)': 40000 },
];

const recentTransactionsData = [
  { date: '15/05/2025, 04:20 pm', merchant: 'ABC Corp', amount: '100.00', currency: 'INR', type: 'DEBIT' },
  { date: '14/05/2025, 03:25 pm', merchant: 'XYZ Services', amount: '10,000.00', currency: 'INR', type: 'CREDIT' },
  { date: '14/05/2025, 03:24 pm', merchant: 'Retail Store', amount: '10,000.00', currency: 'INR', type: 'DEBIT' },
  { date: '14/05/2025, 01:18 pm', merchant: 'Online Shop', amount: '10,000.00', currency: 'INR', type: 'CREDIT' },
  { date: '14/05/2025, 12:22 pm', merchant: 'Food Delivery', amount: '10,000.00', currency: 'INR', type: 'DEBIT' },
  { date: '13/05/2025, 06:14 pm', merchant: 'Utility Bill', amount: '10,000.00', currency: 'INR', type: 'DEBIT' },
  { date: '13/05/2025, 06:10 pm', merchant: 'Gym Membership', amount: '20,000.00', currency: 'INR', type: 'CREDIT' },
  { date: '09/05/2025, 05:20 pm', merchant: 'Subscription', amount: '500.00', currency: 'INR', type: 'DEBIT' },
  { date: '09/05/2025, 05:01 pm', merchant: 'Travel Agency', amount: '15,000.00', currency: 'INR', type: 'CREDIT' },
  { date: '09/05/2025, 04:50 pm', merchant: 'Pharmacy', amount: '250.00', currency: 'INR', type: 'DEBIT' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout title="Super Admin">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <p className="text-lg text-gray-700 mb-8">Hi, Masccons Admin 👋</p>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Prefund Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Prefund</p>
                  <p className="text-3xl font-bold text-gray-900">INR 0.00</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  {/* Chart icon SVG */}
                  <svg className="h-7 w-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.5-7.5a.5.5 0 011 0V11a.5.5 0 01-1 0v-1.5zm2.5-3a.5.5 0 011 0V11a.5.5 0 01-1 0V7.5zm2.5-3a.5.5 0 011 0V11a.5.5 0 01-1 0V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Transaction Amount Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Transaction Amount</p>
                  <p className="text-3xl font-bold text-gray-900">INR 0.00</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  {/* Chart icon SVG */}
                  <svg className="h-7 w-7 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.5-7.5a.5.5 0 011 0V11a.5.5 0 01-1 0v-1.5zm2.5-3a.5.5 0 011 0V11a.5.5 0 01-1 0V7.5zm2.5-3a.5.5 0 011 0V11a.5.5 0 01-1 0V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Active Customers Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Active Customers</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  {/* User group icon SVG */}
                  <svg className="h-7 w-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a3 3 0 100-6 3 3 0 000 6zm7-6a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Total Cards Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Cards</p>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  {/* Credit card icon SVG */}
                  <svg className="h-7 w-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Transaction Volume Over Time Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transaction Volume Over Time</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={transactionVolumeData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Transaction Volume" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Growth Over Time Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Growth Over Time</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueGrowthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Revenue Growth (INR)" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200 ease-in-out hover:underline">View All</a>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION DATE
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MERCHANT NAME
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AMOUNT
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION CURRENCY CODE
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TRANSACTION TYPE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactionsData.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.merchant}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.currency}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
                <span className="mr-2">Showing Pages - 1/16</span>
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
    </AdminLayout>
  );
};

export default AdminDashboard;