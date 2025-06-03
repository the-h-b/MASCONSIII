import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MasterClients = () => {
  const initialClientListData = [
    { id: 1, date: '15/01/2025', name: 'ABC Bank Ltd.', email: 'abc@bank.com', contactNo: '9876543210', userId: 'ABC001' },
    { id: 2, date: '22/01/2025', name: 'XYZ Retail Chain', email: 'xyz@retail.com', contactNo: '9123456789', userId: 'XYZ002' },
    { id: 3, date: '05/02/2025', name: 'Healthcare Solutions', email: 'health@sol.com', contactNo: '9988776655', userId: 'HCS003' },
    { id: 4, date: '12/02/2025', name: 'Tech Innovations', email: 'tech@innov.com', contactNo: '9000112233', userId: 'TIN004' },
    { id: 5, date: '20/02/2025', name: 'Global Traders', email: 'global@trade.com', contactNo: '9765432109', userId: 'GTR005' },
    { id: 6, date: '01/03/2025', name: 'Secure Payments', email: 'secure@pay.com', contactNo: '9555443322', userId: 'SPM006' },
    { id: 7, date: '10/03/2025', name: 'Digital Health', email: 'digital@health.com', contactNo: '9333221100', userId: 'DGH007' },
    { id: 8, date: '18/03/2025', name: 'Future Technologies', email: 'future@tech.com', contactNo: '9222110099', userId: 'FUT008' },
    { id: 9, date: '25/03/2025', name: 'Quantum AI', email: 'quantum@ai.com', contactNo: '9111223344', userId: 'QAI009' },
    { id: 10, date: '02/04/2025', name: 'Green Energy Co.', email: 'green@energy.com', contactNo: '9000000000', userId: 'GEC010' },
  ];

  const [clientListData, setClientListData] = useState(initialClientListData);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({
    date: '',
    name: '',
    email: '',
    contactNo: '',
    userId: ''
  });
  const [searchTermDate, setSearchTermDate] = useState('');
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermEmail, setSearchTermEmail] = useState('');
  const [searchTermContactNo, setSearchTermContactNo] = useState('');
  const [searchTermUserId, setSearchTermUserId] = useState('');
  const [editingClientId, setEditingClientId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddOrUpdateClient = (e) => {
    e.preventDefault();
    if (editingClientId) {
      setClientListData(clientListData.map(client =>
        client.id === editingClientId ? { ...newClient, id: editingClientId } : client
      ));
      customAlert('Client updated successfully!');
    } else {
      const newId = clientListData.length > 0 ? Math.max(...clientListData.map(client => client.id)) + 1 : 1;
      const clientToAdd = { ...newClient, id: newId };
      setClientListData([...clientListData, clientToAdd]);
      customAlert('New client added successfully!');
    }
    setShowAddClientModal(false);
    setEditingClientId(null);
    setNewClient({
      date: '',
      name: '',
      email: '',
      contactNo: '',
      userId: ''
    });
  };

  const handleEditClick = (client) => {
    setNewClient(client);
    setEditingClientId(client.id);
    setShowAddClientModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClientListData(clientListData.filter(client => client.id !== id));
      customAlert('Client deleted successfully!');
    }
  };

  const filteredClientList = clientListData.filter(client => {
    const matchesDate = searchTermDate === '' || client.date.toLowerCase().includes(searchTermDate.toLowerCase());
    const matchesName = searchTermName === '' || client.name.toLowerCase().includes(searchTermName.toLowerCase());
    const matchesEmail = searchTermEmail === '' || client.email.toLowerCase().includes(searchTermEmail.toLowerCase());
    const matchesContactNo = searchTermContactNo === '' || client.contactNo.toLowerCase().includes(searchTermContactNo.toLowerCase());
    const matchesUserId = searchTermUserId === '' || client.userId.toLowerCase().includes(searchTermUserId.toLowerCase());

    return matchesDate && matchesName && matchesEmail && matchesContactNo && matchesUserId;
  });

  const totalPages = Math.ceil(filteredClientList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClientList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Prepare data for the pie chart (e.g., clients by month)
  const getClientDistributionByMonth = () => {
    const monthCounts = {};
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    clientListData.forEach(client => {
      const dateParts = client.date.split('/');
      if (dateParts.length === 3) {
        const monthIndex = parseInt(dateParts[1], 10) - 1; // month is 0-indexed
        const monthName = monthNames[monthIndex];
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(monthCounts),
      datasets: [
        {
          label: '# of Clients',
          data: Object.values(monthCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(200, 50, 100, 0.6)',
            'rgba(100, 200, 50, 0.6)',
            'rgba(50, 100, 200, 0.6)',
            'rgba(200, 100, 50, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(200, 50, 100, 1)',
            'rgba(100, 200, 50, 1)',
            'rgba(50, 100, 200, 1)',
            'rgba(200, 100, 50, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const clientDistributionData = getClientDistributionByMonth();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // You can change this to 'top', 'left', 'bottom'
      },
      title: {
        display: true,
        text: 'Client Registrations by Month',
        font: {
          size: 16
        }
      }
    }
  };


  return (
    <AdminLayout title="Master Clients Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Master Clients Management</h2>
        <button
          onClick={() => {
            setShowAddClientModal(true);
            setEditingClientId(null);
            setNewClient({
              date: '',
              name: '',
              email: '',
              contactNo: '',
              userId: ''
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          + Add New Client
        </button>
      </div>

      {/* Pie Charts Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Pie Chart: Clients by Month */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Clients by Registration Month</h4>
            <div className="h-64"> {/* Fixed height for the chart container */}
              <Pie data={clientDistributionData} options={chartOptions} />
            </div>
          </div>

          {/* Add more pie charts here as needed, e.g., by domain, by contact number prefix etc. */}
          {/* Example Placeholder for another chart */}
          {/* <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Another Analysis (e.g., Client Email Domains)</h4>
            <div className="h-64">
              <p className="text-gray-600">Chart will go here</p>
            </div>
          </div> */}
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Client List</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="dd-mm-yyyy"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTermDate}
            onChange={(e) => setSearchTermDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="NAME"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
          />
          <input
            type="text"
            placeholder="EMAIL"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTermEmail}
            onChange={(e) => setSearchTermEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="CONTACT NO"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTermContactNo}
            onChange={(e) => setSearchTermContactNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="USER ID"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTermUserId}
            onChange={(e) => setSearchTermUserId(e.target.value)}
          />
          <div></div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CONTACT NO
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USER ID
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.contactNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(client)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination with Page Number Toggles */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, filteredClientList.length)}</span> of{' '}
              <span className="font-medium">{filteredClientList.length}</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-center sm:justify-end">
            <ul className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* Previous Button */}
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  {/* Heroicon name: mini/chevron-left */}
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.56 10l3.23 3.71a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    onClick={() => paginate(pageNumber)}
                    aria-current={currentPage === pageNumber ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                      ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}

              {/* Next Button */}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  {/* Heroicon name: mini/chevron-right */}
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.44 10 7.21 6.29a.75.75 0 111.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Add/Edit Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {editingClientId ? 'Edit Client' : 'Add New Client'}
            </h3>
            <form onSubmit={handleAddOrUpdateClient}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="dd/mm/yyyy"
                  value={newClient.date}
                  onChange={(e) => setNewClient({ ...newClient, date: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client Name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client Email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact No
                </label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client Contact Number"
                  value={newClient.contactNo}
                  onChange={(e) => setNewClient({ ...newClient, contactNo: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client User ID"
                  value={newClient.userId}
                  onChange={(e) => setNewClient({ ...newClient, userId: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                >
                  {editingClientId ? 'Update Client' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MasterClients;