import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout'; 

const BINSetup = () => {
  // State for search filters
  const [statusFilter, setStatusFilter] = useState('');
  const [masterBINFilter, setMasterBINFilter] = useState('');
  const [subBINFilter, setSubBINFilter] = useState('');
  const [binFilter, setBinFilter] = useState('');
  const [masterClientCodeFilter, setMasterClientCodeFilter] = useState('');
  const [binIdentifierFilter, setBinIdentifierFilter] = useState('');
  
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBIN, setSelectedBIN] = useState(null);
  
  // State for form inputs in Add/Edit modals
  const [formData, setFormData] = useState({
    status: '',
    masterBIN: '',
    subBIN: '',
    bin: '',
    masterClientCode: '',
    binIdentifier: ''
  });

  // Dummy data for the table
  const [tableData, setTableData] = useState([
    {
      status: 'ASSIGNED',
      masterBIN: '12340000',
      subBIN: '6555',
      bin: '12340006555',
      masterClientCode: 'MSTRCLTV61MB7J6WTTJQT4H6XCP',
      binIdentifier: 'V022',
    },
    {
      status: 'UNASSIGNED',
      masterBIN: '12340000',
      subBIN: '77',
      bin: '1234000077',
      masterClientCode: 'MSTRCLTV61MB7J6WTTJQT4H6XCP',
      binIdentifier: 'V021',
    },
    {
      status: 'UNASSIGNED',
      masterBIN: '888888',
      subBIN: '99',
      bin: '88888899',
      masterClientCode: 'MSTRCLTV61MB7J6WTTJQT4H6XCP',
      binIdentifier: 'V020',
    },
    {
      status: 'UNASSIGNED',
      masterBIN: '889977',
      subBIN: '01',
      bin: '88997701',
      masterClientCode: 'MSTRCLZTFPKC4KWR69D4ZBCBTZ7',
      binIdentifier: 'RU015',
    },
    {
      status: 'ASSIGNED',
      masterBIN: '44556709',
      subBIN: '0001',
      bin: '445567090001',
      masterClientCode: 'MSTRCLTCK6DL3MKXJ6Y2DCWXPFQ',
      binIdentifier: 'RU014',
    },
    {
      status: 'ASSIGNED',
      masterBIN: '112233',
      subBIN: '0001',
      bin: '1122330001',
      masterClientCode: 'MSTRCLTBNLP3YA740D9I4XPU2',
      binIdentifier: 'RU013',
    },
    {
      status: 'ASSIGNED',
      masterBIN: '77663412',
      subBIN: '0002',
      bin: '776634120002',
      masterClientCode: 'MSTRCLTCMJX7T9KJLNPGHPXA900',
      binIdentifier: 'V019',
    },
    {
      status: 'ASSIGNED',
      masterBIN: '99887766',
      subBIN: '0001',
      bin: '998877660001',
      masterClientCode: 'MSTRCLTSNL6UPTLS4DMUPJS0P8H',
      binIdentifier: 'RU011',
    },
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // Filtered data based on search inputs (for demonstration, a simple filter)
  const filteredData = tableData.filter((row) => {
    return (
      (statusFilter === '' || row.status.toLowerCase().includes(statusFilter.toLowerCase())) &&
      (masterBINFilter === '' || row.masterBIN.includes(masterBINFilter)) &&
      (subBINFilter === '' || row.subBIN.includes(subBINFilter)) &&
      (binFilter === '' || row.bin.includes(binFilter)) &&
      (masterClientCodeFilter === '' || row.masterClientCode.toLowerCase().includes(masterClientCodeFilter.toLowerCase())) &&
      (binIdentifierFilter === '' || row.binIdentifier.toLowerCase().includes(binIdentifierFilter.toLowerCase()))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handler for opening the Add BIN modal
  const handleAddBIN = () => {
    setFormData({
      status: 'UNASSIGNED',
      masterBIN: '',
      subBIN: '',
      bin: '',
      masterClientCode: '',
      binIdentifier: ''
    });
    setIsAddModalOpen(true);
  };
  
  // Handler for opening the Edit BIN modal
  const handleEditBIN = (bin) => {
    setSelectedBIN(bin);
    setFormData({
      status: bin.status,
      masterBIN: bin.masterBIN,
      subBIN: bin.subBIN,
      bin: bin.bin,
      masterClientCode: bin.masterClientCode,
      binIdentifier: bin.binIdentifier
    });
    setIsEditModalOpen(true);
  };
  
  // Handler for opening the View BIN modal
  const handleViewBIN = (bin) => {
    setSelectedBIN(bin);
    setIsViewModalOpen(true);
  };
  
  // Handler for opening the Delete confirmation
  const handleDeleteConfirm = (bin) => {
    setSelectedBIN(bin);
    setIsDeleteConfirmOpen(true);
  };
  
  // Handler for form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handler for saving a new BIN
  const handleSaveNewBIN = () => {
    // Generate a new BIN by combining masterBIN and subBIN
    const newBIN = {
      ...formData,
      bin: formData.masterBIN + formData.subBIN
    };
    
    setTableData([...tableData, newBIN]);
    setIsAddModalOpen(false);
  };
  
  // Handler for updating an existing BIN
  const handleUpdateBIN = () => {
    const updatedData = tableData.map(item => 
      item.bin === selectedBIN.bin ? { ...formData, bin: formData.masterBIN + formData.subBIN } : item
    );
    
    setTableData(updatedData);
    setIsEditModalOpen(false);
  };
  
  // Handler for deleting a BIN
  const handleDeleteBIN = () => {
    const updatedData = tableData.filter(item => item.bin !== selectedBIN.bin);
    setTableData(updatedData);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <AdminLayout title="BIN Setup">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">BIN Setup</h2>
        <button 
          onClick={handleAddBIN}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add BIN
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">BIN Search List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 sr-only">Status</label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Please Select Stat</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="UNASSIGNED">UNASSIGNED</option>
            </select>
          </div>

          {/* Master BIN Filter */}
          <div>
            <label htmlFor="master-bin" className="block text-sm font-medium text-gray-700 sr-only">Master BIN</label>
            <input
              type="text"
              id="master-bin"
              name="master-bin"
              placeholder="Master BIN"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={masterBINFilter}
              onChange={(e) => setMasterBINFilter(e.target.value)}
            />
          </div>

          {/* Sub BIN Filter */}
          <div>
            <label htmlFor="sub-bin" className="block text-sm font-medium text-gray-700 sr-only">Sub BIN</label>
            <input
              type="text"
              id="sub-bin"
              name="sub-bin"
              placeholder="Sub BIN"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={subBINFilter}
              onChange={(e) => setSubBINFilter(e.target.value)}
            />
          </div>

          {/* BIN Filter */}
          <div>
            <label htmlFor="bin" className="block text-sm font-medium text-gray-700 sr-only">BIN</label>
            <input
              type="text"
              id="bin"
              name="bin"
              placeholder="BIN"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={binFilter}
              onChange={(e) => setBinFilter(e.target.value)}
            />
          </div>

          {/* Master Client Code Filter */}
          <div>
            <label htmlFor="master-client-code" className="block text-sm font-medium text-gray-700 sr-only">Master Client Code</label>
            <input
              type="text"
              id="master-client-code"
              name="master-client-code"
              placeholder="Master Client Code"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={masterClientCodeFilter}
              onChange={(e) => setMasterClientCodeFilter(e.target.value)}
            />
          </div>

          {/* BIN Identifier Filter */}
          <div>
            <label htmlFor="bin-identifier" className="block text-sm font-medium text-gray-700 sr-only">BIN Identifier</label>
            <input
              type="text"
              id="bin-identifier"
              name="bin-identifier"
              placeholder="BIN Identifier"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={binIdentifierFilter}
              onChange={(e) => setBinIdentifierFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">STATUS</th>
                <th scope="col" className="py-3 px-6">MASTER BIN</th>
                <th scope="col" className="py-3 px-6">SUB BIN</th>
                <th scope="col" className="py-3 px-6">BIN</th>
                <th scope="col" className="py-3 px-6">MASTER CLIENT CODE</th>
                <th scope="col" className="py-3 px-6">BIN IDENTIFIER</th>
                <th scope="col" className="py-3 px-6 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        row.status === 'ASSIGNED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{row.masterBIN}</td>
                  <td className="py-4 px-6">{row.subBIN}</td>
                  <td className="py-4 px-6">{row.bin}</td>
                  <td className="py-4 px-6">{row.masterClientCode}</td>
                  <td className="py-4 px-6">{row.binIdentifier}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleEditBIN(row)} 
                        className="font-medium text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteConfirm(row)} 
                        className="font-medium text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleViewBIN(row)} 
                        className="font-medium text-gray-600 hover:text-gray-900"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="flex items-center justify-end pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 mr-4">
            Showing Pages{' '}
            <span className="font-semibold text-gray-900">
              {currentPage}
            </span>{' '}
            / <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === page
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white'
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Add BIN Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Add New BIN</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="UNASSIGNED">UNASSIGNED</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="masterBIN" className="block text-sm font-medium text-gray-700 mb-1">Master BIN</label>
                <input
                  type="text"
                  id="masterBIN"
                  name="masterBIN"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.masterBIN}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="subBIN" className="block text-sm font-medium text-gray-700 mb-1">Sub BIN</label>
                <input
                  type="text"
                  id="subBIN"
                  name="subBIN"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subBIN}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="masterClientCode" className="block text-sm font-medium text-gray-700 mb-1">Master Client Code</label>
                <input
                  type="text"
                  id="masterClientCode"
                  name="masterClientCode"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.masterClientCode}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="binIdentifier" className="block text-sm font-medium text-gray-700 mb-1">BIN Identifier</label>
                <input
                  type="text"
                  id="binIdentifier"
                  name="binIdentifier"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.binIdentifier}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewBIN}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit BIN Modal */}
      {isEditModalOpen && selectedBIN && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit BIN</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="UNASSIGNED">UNASSIGNED</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="masterBIN" className="block text-sm font-medium text-gray-700 mb-1">Master BIN</label>
                <input
                  type="text"
                  id="masterBIN"
                  name="masterBIN"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.masterBIN}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="subBIN" className="block text-sm font-medium text-gray-700 mb-1">Sub BIN</label>
                <input
                  type="text"
                  id="subBIN"
                  name="subBIN"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subBIN}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="masterClientCode" className="block text-sm font-medium text-gray-700 mb-1">Master Client Code</label>
                <input
                  type="text"
                  id="masterClientCode"
                  name="masterClientCode"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.masterClientCode}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label htmlFor="binIdentifier" className="block text-sm font-medium text-gray-700 mb-1">BIN Identifier</label>
                <input
                  type="text"
                  id="binIdentifier"
                  name="binIdentifier"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.binIdentifier}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBIN}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View BIN Modal */}
      {isViewModalOpen && selectedBIN && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">View BIN Details</h3>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedBIN.status === 'ASSIGNED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedBIN.status}
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Master BIN</p>
                <p className="mt-1 text-sm text-gray-900">{selectedBIN.masterBIN}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Sub BIN</p>
                <p className="mt-1 text-sm text-gray-900">{selectedBIN.subBIN}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">BIN</p>
                <p className="mt-1 text-sm text-gray-900">{selectedBIN.bin}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Master Client Code</p>
                <p className="mt-1 text-sm text-gray-900">{selectedBIN.masterClientCode}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">BIN Identifier</p>
                <p className="mt-1 text-sm text-gray-900">{selectedBIN.binIdentifier}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteConfirmOpen && selectedBIN && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete the BIN <span className="font-semibold">{selectedBIN.bin}</span>? 
                This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBIN}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BINSetup;