import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
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

// Client growth data
const clientGrowthData = [
  { month: 'Jan', clients: 45 },
  { month: 'Feb', clients: 52 },
  { month: 'Mar', clients: 61 },
  { month: 'Apr', clients: 67 },
  { month: 'May', clients: 75 },
  { month: 'Jun', clients: 84 },
  { month: 'Jul', clients: 91 },
];

// Lender growth data
const lenderGrowthData = [
  { month: 'Jan', lenders: 12 },
  { month: 'Feb', lenders: 15 },
  { month: 'Mar', lenders: 18 },
  { month: 'Apr', lenders: 22 },
  { month: 'May', lenders: 25 },
  { month: 'Jun', lenders: 28 },
  { month: 'Jul', lenders: 32 },
];

// Invoice data
const invoiceData = [
  { month: 'Jan', count: 120, amount: 1200000 },
  { month: 'Feb', count: 150, amount: 1500000 },
  { month: 'Mar', count: 180, amount: 1800000 },
  { month: 'Apr', count: 210, amount: 2100000 },
  { month: 'May', count: 240, amount: 2400000 },
  { month: 'Jun', count: 270, amount: 2700000 },
  { month: 'Jul', count: 300, amount: 3000000 },
];

// Loan disbursement data
const loanDisbursementData = [
  { month: 'Jan', amount: 2500000 },
  { month: 'Feb', amount: 3200000 },
  { month: 'Mar', amount: 4100000 },
  { month: 'Apr', amount: 3800000 },
  { month: 'May', amount: 4500000 },
  { month: 'Jun', amount: 5200000 },
  { month: 'Jul', amount: 6000000 },
];

// Interest earned data
const interestEarnedData = [
  { month: 'Jan', amount: 250000 },
  { month: 'Feb', amount: 320000 },
  { month: 'Mar', amount: 410000 },
  { month: 'Apr', amount: 380000 },
  { month: 'May', amount: 450000 },
  { month: 'Jun', amount: 520000 },
  { month: 'Jul', amount: 600000 },
];

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000'];

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
      <p className="text-lg text-gray-700 mb-8">Hi, Masconsi Admin 👋</p>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Total Clients Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-900">91</p>
                  <p className="text-sm text-green-600">+8.3% from last month</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a3 3 0 100-6 3 3 0 000 6zm7-6a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Total Lenders Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Lenders</p>
                  <p className="text-3xl font-bold text-gray-900">32</p>
                  <p className="text-sm text-green-600">+14.3% from last month</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Total Invoice Issued Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Invoices Issued</p>
                  <p className="text-3xl font-bold text-gray-900">1,470</p>
                  <p className="text-sm text-green-600">+11.1% from last month</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Total Loan Disbursed Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Loan Disbursed</p>
                  <p className="text-3xl font-bold text-gray-900">₹29.3M</p>
                  <p className="text-sm text-green-600">+15.4% from last month</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Total Interest Earned Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Total Interest Earned</p>
                  <p className="text-3xl font-bold text-gray-900">₹2.93M</p>
                  <p className="text-sm text-green-600">+15.4% from last month</p>
                </div>
                <div className="bg-red-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Active Customers Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <div>
                  <p className="text-gray-500 text-base">Active Customers</p>
                  <p className="text-3xl font-bold text-gray-900">78</p>
                  <p className="text-sm text-green-600">+5.4% from last month</p>
                </div>
                <div className="bg-indigo-100 p-4 rounded-full">
                  <svg className="h-7 w-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a3 3 0 100-6 3 3 0 000 6zm7-6a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Client & Lender Growth Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Client & Lender Growth</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={clientGrowthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="clients" name="Total Clients" fill="#8884d8" />
                      <Bar dataKey="lenders" name="Total Lenders" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Invoice Issued Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Invoice Issued</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={invoiceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Invoice Count" fill="#FFBB28" />
                      <Bar yAxisId="right" dataKey="amount" name="Invoice Amount (₹)" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Loan Disbursement Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Loan Disbursement</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={loanDisbursementData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip formatter={(value) => [`₹${(value/1000000).toFixed(2)}M`, 'Loan Amount']} />
                      <Legend />
                      <Area type="monotone" dataKey="amount" name="Loan Amount (₹)" stroke="#8884d8" fillOpacity={1} fill="url(#colorLoan)" />
                      <defs>
                        <linearGradient id="colorLoan" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Interest Earned Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interest Earned</h3>
                <div className="h-80"> {/* Fixed height for charts */}
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={interestEarnedData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip formatter={(value) => [`₹${(value/1000).toFixed(0)}K`, 'Interest Amount']} />
                      <Legend />
                      <Area type="monotone" dataKey="amount" name="Interest Earned (₹)" stroke="#82ca9d" fillOpacity={1} fill="url(#colorInterest)" />
                      <defs>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
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