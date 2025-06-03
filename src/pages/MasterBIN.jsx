import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth'; 

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B', '#6BFFC1']; 

const MasterBIN = () => {
  
  const initialBinListData = [
    { id: 1, binType: 'DEDICATED', network: 'Visa', bin: '601756', binIssuer: 'payworld', mdr: '2', countryCode: 'IND', currencyCode: 'INR' },
    { id: 2, binType: 'SHARED', network: 'Visa', bin: '1234000', binIssuer: 'Paypoint', mdr: '2', countryCode: 'IND', currencyCode: 'INR' },
    { id: 3, binType: 'SHARED', network: 'Visa', bin: '888888', binIssuer: 'HDFC', mdr: '2', countryCode: 'IND', currencyCode: 'INR' },
    { id: 4, binType: 'SHARED', network: 'Rupay', bin: '456777', binIssuer: 'Ridum Tech Info', mdr: '2', countryCode: 'IND', currencyCode: 'INR' },
    { id: 5, binType: 'SHARED', network: 'Visa', bin: '1234000', binIssuer: 'pay', mdr: '3', countryCode: 'IND', currencyCode: 'INR' },
    { id: 6, binType: 'SHARED', network: 'Rupay', bin: '889977', binIssuer: 'closedloopdemo2', mdr: '-', countryCode: 'IND', currencyCode: 'INR' },
    { id: 7, binType: 'SHARED', network: 'Rupay', bin: '44556709', binIssuer: 'Democlsedloop', mdr: '-', countryCode: 'IND', currencyCode: 'INR' },
    { id: 8, binType: 'DEDICATED', network: 'Mastercard', bin: '512345', binIssuer: 'Global Bank', mdr: '2.5', countryCode: 'USA', currencyCode: 'USD' },
    { id: 9, binType: 'SHARED', network: 'Visa', bin: '400011', binIssuer: 'Local Credit', mdr: '2', countryCode: 'GBR', currencyCode: 'GBP' },
    { id: 10, binType: 'DEDICATED', network: 'Mastercard', bin: '520000', binIssuer: 'City Union', mdr: '3.1', countryCode: 'CAN', currencyCode: 'CAD' },
  ];

  // State for managing the BIN list data
  const [binListData, setBinListData] = useState(initialBinListData);
  // State for controlling the "Add BIN" modal visibility
  const [showAddBinModal, setShowAddBinModal] = useState(false);
  // State for the new BIN form inputs
  const [newBin, setNewBin] = useState({
    binType: 'DEDICATED',
    network: '',
    bin: '',
    binIssuer: '',
    mdr: '',
    countryCode: '',
    currencyCode: ''
  });
  // State for search and filter inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBinType, setFilterBinType] = useState('');
  const [filterNetwork, setFilterNetwork] = useState('');
  // State to track if we are editing an existing BIN
  const [editingBinId, setEditingBinId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Handle adding or updating a BIN
  const handleAddOrUpdateBin = (e) => {
    e.preventDefault();
    if (editingBinId) {
      // Update existing BIN
      setBinListData(binListData.map(bin =>
        bin.id === editingBinId ? { ...newBin, id: editingBinId } : bin
      ));
      customAlert('Master BIN updated successfully!');
    } else {
      // Add new BIN
      const newId = binListData.length > 0 ? Math.max(...binListData.map(bin => bin.id)) + 1 : 1;
      const binToAdd = { ...newBin, id: newId };
      setBinListData([...binListData, binToAdd]);
      customAlert('New Master BIN added successfully!');
    }
    setShowAddBinModal(false); // Close the modal
    setEditingBinId(null); // Reset editing state
    // Reset form fields
    setNewBin({
      binType: 'DEDICATED',
      network: '',
      bin: '',
      binIssuer: '',
      mdr: '',
      countryCode: '',
      currencyCode: ''
    });
  };

  // Handle opening the modal for editing
  const handleEditClick = (bin) => {
    setNewBin(bin); // Populate form with existing BIN data
    setEditingBinId(bin.id); // Set editing ID
    setShowAddBinModal(true); // Open the modal
  };

  // Handle deleting a BIN
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this BIN?')) { // Using window.confirm for simplicity, replace with custom modal in production
      setBinListData(binListData.filter(bin => bin.id !== id));
      customAlert('BIN deleted successfully!');
    }
  };

  // Filter the BIN list based on search term and dropdown selections
  const filteredBinList = binListData.filter(bin => {
    const matchesSearchTerm = Object.values(bin).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesBinType = filterBinType === '' || bin.binType === filterBinType;
    const matchesNetwork = filterNetwork === '' || bin.network === filterNetwork;
    return matchesSearchTerm && matchesBinType && matchesNetwork;
  });

  // Calculate pagination details
  const totalPages = Math.ceil(filteredBinList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBinList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate data for BIN Type Distribution Pie Chart
  const binTypeCounts = binListData.reduce((acc, bin) => {
    acc[bin.binType] = (acc[bin.binType] || 0) + 1;
    return acc;
  }, {});
  const binTypePieData = Object.entries(binTypeCounts).map(([name, value]) => ({ name, value }));

  // Calculate data for MDR% Distribution Pie Chart
  const mdrCounts = binListData.reduce((acc, bin) => {
    const mdrValue = bin.mdr && bin.mdr !== '-' ? `${bin.mdr}%` : 'N/A';
    acc[mdrValue] = (acc[mdrValue] || 0) + 1;
    return acc;
  }, {});
  const mdrPieData = Object.entries(mdrCounts).map(([name, value]) => ({ name, value }));

  return (
    <AdminLayout title="Master BIN">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Master BIN</h2>
        <button
          onClick={() => {
            setShowAddBinModal(true);
            setEditingBinId(null); // Ensure we are in "add" mode
            setNewBin({ // Reset form for new entry
              binType: 'DEDICATED',
              network: '',
              bin: '',
              binIssuer: '',
              mdr: '',
              countryCode: '',
              currencyCode: ''
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          + Add Master BIN
        </button>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* BIN Type Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">BIN Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={binTypePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {binTypePieData.map((entry, index) => (
                    <Cell key={`cell-bin-type-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MDR% Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">MDR(%) Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mdrPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mdrPieData.map((entry, index) => (
                    <Cell key={`cell-mdr-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Master BIN Search List Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Master BIN Search List</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div>
            <label htmlFor="binTypeFilter" className="sr-only">BIN TYPE</label>
            <select
              id="binTypeFilter"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={filterBinType}
              onChange={(e) => setFilterBinType(e.target.value)}
            >
              <option value="">Please Select BIN Type</option>
              <option value="DEDICATED">DEDICATED</option>
              <option value="SHARED">SHARED</option>
            </select>
          </div>
          <div>
            <label htmlFor="networkFilter" className="sr-only">NETWORK</label>
            <select
              id="networkFilter"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={filterNetwork}
              onChange={(e) => setFilterNetwork(e.target.value)}
            >
              <option value="">Please select network</option>
              <option value="Visa">Visa</option>
              <option value="Rupay">Rupay</option>
              <option value="Mastercard">Mastercard</option> {/* Added Mastercard */}
            </select>
          </div>
          <input
            type="text"
            placeholder="BIN"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="BIN ISSUER"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="MDR(%)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Empty div for layout alignment as per image */}
          <div></div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BIN TYPE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NETWORK
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BIN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BIN ISSUER
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MDR(%)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COUNTRY CODE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CURRENCY CODE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((bin) => (
                <tr key={bin.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bin.binType === 'DEDICATED' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {bin.binType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.network}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.bin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.binIssuer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.mdr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.countryCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bin.currencyCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(bin)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(bin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
          <span className="mr-2">Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBinList.length)} of {filteredBinList.length}</span>
          <div className="flex space-x-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-1 rounded-md transition duration-200 ease-in-out ${page === currentPage ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Master BIN Modal */}
      {showAddBinModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{editingBinId ? 'Edit Master BIN' : 'Add New Master BIN'}</h3>
            <form onSubmit={handleAddOrUpdateBin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newBinType">
                  BIN TYPE
                </label>
                <select
                  id="newBinType"
                  value={newBin.binType}
                  onChange={(e) => setNewBin({...newBin, binType: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="DEDICATED">DEDICATED</option>
                  <option value="SHARED">SHARED</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newNetwork">
                  NETWORK
                </label>
                <select
                  id="newNetwork"
                  value={newBin.network}
                  onChange={(e) => setNewBin({...newBin, network: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Network</option>
                  <option value="Visa">Visa</option>
                  <option value="Rupay">Rupay</option>
                  <option value="Mastercard">Mastercard</option> {/* Added Mastercard */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newBin">
                  BIN
                </label>
                <input
                  id="newBin"
                  type="text"
                  value={newBin.bin}
                  onChange={(e) => setNewBin({...newBin, bin: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter BIN number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newBinIssuer">
                  BIN ISSUER
                </label>
                <input
                  id="newBinIssuer"
                  type="text"
                  value={newBin.binIssuer}
                  onChange={(e) => setNewBin({...newBin, binIssuer: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter BIN issuer"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newMdr">
                  MDR(%)
                </label>
                <input
                  id="newMdr"
                  type="text"
                  value={newBin.mdr}
                  onChange={(e) => setNewBin({...newBin, mdr: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter MDR percentage (e.g., 2, 3, or -)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newCountryCode">
                  COUNTRY CODE
                </label>
                <input
                  id="newCountryCode"
                  type="text"
                  value={newBin.countryCode}
                  onChange={(e) => setNewBin({...newBin, countryCode: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g., IND, USA"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newCurrencyCode">
                  CURRENCY CODE
                </label>
                <input
                  id="newCurrencyCode"
                  type="text"
                  value={newBin.currencyCode}
                  onChange={(e) => setNewBin({...newBin, currencyCode: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g., INR, USD"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddBinModal(false);
                    setEditingBinId(null); 
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {editingBinId ? 'Update BIN' : 'Add BIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MasterBIN;
