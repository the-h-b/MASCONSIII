// Cards.jsx - Card management component
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Area, Line
} from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth';

// Card issuance data
const cardIssuanceData = [
  { month: 'Jan', physical: 1200, virtual: 800 },
  { month: 'Feb', physical: 1500, virtual: 1000 },
  { month: 'Mar', physical: 1800, virtual: 1200 },
  { month: 'Apr', physical: 1400, virtual: 1500 },
  { month: 'May', physical: 2000, virtual: 1800 },
  { month: 'Jun', physical: 2200, virtual: 2500 },
  { month: 'Jul', physical: 1800, virtual: 3000 },
];

// Card status distribution
const cardStatusData = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 15 },
  { name: 'Blocked', value: 10 },
  { name: 'Expired', value: 8 },
  { name: 'Pending', value: 2 },
];

// Card type distribution
const cardTypeData = [
  { name: 'Debit', value: 45 },
  { name: 'Credit', value: 30 },
  { name: 'Prepaid', value: 25 },
];

// Card usage trends
const cardUsageData = [
  { month: 'Jan', transactions: 5000, volume: 2500000, average: 500 },
  { month: 'Feb', transactions: 6200, volume: 3100000, average: 500 },
  { month: 'Mar', transactions: 7800, volume: 3900000, average: 500 },
  { month: 'Apr', transactions: 8500, volume: 4250000, average: 500 },
  { month: 'May', transactions: 9200, volume: 4600000, average: 500 },
  { month: 'Jun', transactions: 11000, volume: 5500000, average: 500 },
  { month: 'Jul', transactions: 12500, volume: 6250000, average: 500 },
];

// Card list data
const cardListData = [
  { 
    id: 1, 
    cardNumber: '4567 XXXX XXXX 7890', 
    maskedNumber: '456789******7890',
    proxyNumber: 'PRX123456789',
    cardholderName: 'John Smith', 
    firstName: 'John',
    lastName: 'Smith',
    cardType: 'Debit', 
    issuanceType: 'Physical',
    issueDate: '15/01/2025', 
    expiryDate: '15/01/2028', 
    status: 'Active',
    activationStatus: 'Activated',
    customerHashId: 'CUST123456HASH789',
    clientId: 'CLIENT001',
    cardHashId: 'CARD987654HASH321'
  },
  { 
    id: 2, 
    cardNumber: '5678 XXXX XXXX 8901', 
    maskedNumber: '567890******8901',
    proxyNumber: 'PRX234567890',
    cardholderName: 'Jane Doe', 
    firstName: 'Jane',
    lastName: 'Doe',
    cardType: 'Credit', 
    issuanceType: 'Physical',
    issueDate: '22/01/2025', 
    expiryDate: '22/01/2028', 
    status: 'Active',
    activationStatus: 'Activated',
    customerHashId: 'CUST234567HASH890',
    clientId: 'CLIENT002',
    cardHashId: 'CARD876543HASH210'
  },
  { 
    id: 3, 
    cardNumber: '6789 XXXX XXXX 9012', 
    maskedNumber: '678901******9012',
    proxyNumber: 'PRX345678901',
    cardholderName: 'Robert Johnson', 
    firstName: 'Robert',
    lastName: 'Johnson',
    cardType: 'Prepaid', 
    issuanceType: 'Virtual',
    issueDate: '05/02/2025', 
    expiryDate: '05/02/2027', 
    status: 'Inactive',
    activationStatus: 'Not Activated',
    customerHashId: 'CUST345678HASH901',
    clientId: 'CLIENT003',
    cardHashId: 'CARD765432HASH109'
  },
  { 
    id: 4, 
    cardNumber: '7890 XXXX XXXX 0123', 
    maskedNumber: '789012******0123',
    proxyNumber: 'PRX456789012',
    cardholderName: 'Emily Williams', 
    firstName: 'Emily',
    lastName: 'Williams',
    cardType: 'Debit', 
    issuanceType: 'Physical',
    issueDate: '12/02/2025', 
    expiryDate: '12/02/2028', 
    status: 'Active',
    activationStatus: 'Activated',
    customerHashId: 'CUST456789HASH012',
    clientId: 'CLIENT001',
    cardHashId: 'CARD654321HASH098'
  },
  { 
    id: 5, 
    cardNumber: '8901 XXXX XXXX 1234', 
    maskedNumber: '890123******1234',
    proxyNumber: 'PRX567890123',
    cardholderName: 'Michael Brown', 
    firstName: 'Michael',
    lastName: 'Brown',
    cardType: 'Credit', 
    issuanceType: 'Physical',
    issueDate: '20/02/2025', 
    expiryDate: '20/02/2028', 
    status: 'Blocked',
    activationStatus: 'Activated',
    customerHashId: 'CUST567890HASH123',
    clientId: 'CLIENT002',
    cardHashId: 'CARD543210HASH987'
  },
  { 
    id: 6, 
    cardNumber: '9012 XXXX XXXX 2345', 
    maskedNumber: '901234******2345',
    proxyNumber: 'PRX678901234',
    cardholderName: 'Sarah Miller', 
    firstName: 'Sarah',
    lastName: 'Miller',
    cardType: 'Prepaid', 
    issuanceType: 'Virtual',
    issueDate: '01/03/2025', 
    expiryDate: '01/03/2027', 
    status: 'Pending',
    activationStatus: 'Not Activated',
    customerHashId: 'CUST678901HASH234',
    clientId: 'CLIENT003',
    cardHashId: 'CARD432109HASH876'
  },
  { 
    id: 7, 
    cardNumber: '0123 XXXX XXXX 3456', 
    maskedNumber: '012345******3456',
    proxyNumber: 'PRX789012345',
    cardholderName: 'David Wilson', 
    firstName: 'David',
    lastName: 'Wilson',
    cardType: 'Debit', 
    issuanceType: 'Physical',
    issueDate: '10/03/2025', 
    expiryDate: '10/03/2028', 
    status: 'Active',
    activationStatus: 'Activated',
    customerHashId: 'CUST789012HASH345',
    clientId: 'CLIENT001',
    cardHashId: 'CARD321098HASH765'
  },
  { 
    id: 8, 
    cardNumber: '1234 XXXX XXXX 4567', 
    maskedNumber: '123456******4567',
    proxyNumber: 'PRX890123456',
    cardholderName: 'Lisa Taylor', 
    firstName: 'Lisa',
    lastName: 'Taylor',
    cardType: 'Credit', 
    issuanceType: 'Physical',
    issueDate: '18/03/2025', 
    expiryDate: '18/03/2028', 
    status: 'Expired',
    activationStatus: 'Activated',
    customerHashId: 'CUST890123HASH456',
    clientId: 'CLIENT002',
    cardHashId: 'CARD210987HASH654'
  },
];

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF0000'];

const Cards = () => {
  // States
  const [showIssueCardModal, setShowIssueCardModal] = useState(false);
  const [showViewCardModal, setShowViewCardModal] = useState(false);
  const [showBlockCardModal, setShowBlockCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  

  const [selectedCard, setSelectedCard] = useState(null);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  
  const [cards, setCards] = useState([
    {
      id: '1',
      activationStatus: 'INACTIVE',
      proxyNumber: 'P1178100137471',
      maskedNumber: '********3041',
      cardType: 'NA',
      issuanceType: 'PRIMARY CARD',
      customerHashId: 'Not Assigned',
      clientId: '363',
      cardHash: '42cd57ed-6f77-4e63-8657-805dc060ce56',
      firstName: '',
      lastName: '',
      action: 'Actions :',
    },
    {
      id: '2',
      activationStatus: 'INACTIVE',
      proxyNumber: 'P5148100137471',
      maskedNumber: '********3033',
      cardType: 'NA',
      issuanceType: 'PRIMARY CARD',
      customerHashId: 'Not Assigned',
      clientId: '363',
      cardHash: '562698ea-3d5a-4318-9821-12c809f4dc6b',
      firstName: '',
      lastName: '',
      action: 'Actions :',
    },
    {
      id: '3',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P0786331227471',
      maskedNumber: '********3025',
      cardType: 'NA',
      issuanceType: 'PRIMARY CARD',
      customerHashId: '23b966dc-8e5d-41e9-bd08-3642e3bdcfac',
      clientId: '363',
      cardHash: 'e0f6bb9c-ffae-4c0c-a47b-8e45ad387d09',
      firstName: 'Cust001 authc002',
      lastName: 'cust001aithc002p002gpr',
      action: 'Actions :',
    },
    {
      id: '4',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P6456331227471',
      maskedNumber: '********3017',
      cardType: 'NA',
      issuanceType: 'PRIMARY CARD',
      customerHashId: '23b966dc-8e5d-41e9-bd08-3642e3bdcfac',
      clientId: '363',
      cardHash: '5b3d3ad2-7e80-4e9c-b0af-609ed6cbce6a',
      firstName: 'Cust001 authc002',
      lastName: 'cust001aithc002p002gpr',
      action: 'Actions :',
    },
    {
      id: '5',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P9119728385471',
      maskedNumber: '********0019',
      cardType: 'GC PHYSICAL',
      issuanceType: 'PRIMARY CARD',
      customerHashId: '23b966dc-8e5d-41e9-bd08-3642e3bdcfac',
      clientId: '363',
      cardHash: 'f99079bf-1165-482f-8ed2-325be6689a0d',
      firstName: 'Cust001 authc002',
      lastName: 'cust001aithc002p002gpr',
      action: 'Actions :',
    },
    {
      id: '6',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P8639728385471',
      maskedNumber: '********0027',
      cardType: 'GC PHYSICAL',
      issuanceType: 'PRIMARY CARD',
      customerHashId: '23b966dc-8e5d-41e9-bd08-3642e3bdcfac',
      clientId: '363',
      cardHash: '4e9c7525-fc5d-4e8d-a173-f4fa8f9e3d6c',
      firstName: 'Cust001 authc002',
      lastName: 'cust001aithc002p002gpr',
      action: 'Actions :',
    },
    {
      id: '7',
      activationStatus: 'INACTIVE',
      proxyNumber: 'P7864197385471',
      maskedNumber: '********0001',
      cardType: 'GC PHYSICAL',
      issuanceType: 'PRIMARY CARD',
      customerHashId: 'Not Assigned',
      clientId: '363',
      cardHash: '6f6c282e-10ff-4bea-8bb2-1b0ce3638b7b',
      firstName: '',
      lastName: '',
      action: 'Actions :',
    },
    {
      id: '8',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P1234567890123',
      maskedNumber: '********1234',
      cardType: 'VIRTUAL',
      issuanceType: 'SECONDARY CARD',
      customerHashId: '7d21914a-bfa4-47fa-9a6f-d1b24a8705d6',
      clientId: '362',
      cardHash: 'd8ce578f-1b2c-4c5e-80e8-ca682b003a65',
      firstName: 'Auth cust001',
      lastName: 'Auth cust001 p001GFT',
      action: 'Actions :',
    },
    {
      id: '9',
      activationStatus: 'INACTIVE',
      proxyNumber: 'P9876543210987',
      maskedNumber: '********5678',
      cardType: 'PHYSICAL',
      issuanceType: 'PRIMARY CARD',
      customerHashId: 'Not Assigned',
      clientId: '363',
      cardHash: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      firstName: '',
      lastName: '',
      action: 'Actions :',
    },
    {
      id: '10',
      activationStatus: 'ACTIVE',
      proxyNumber: 'P1122334455667',
      maskedNumber: '********9012',
      cardType: 'VIRTUAL',
      issuanceType: 'PRIMARY CARD',
      customerHashId: 'abcde123-4567-8901-fede-dcba98765432',
      clientId: '364',
      cardHash: 'fedcba98-7654-3210-9876-543210abcdef',
      firstName: '',
      lastName: '',
      action: 'Actions :',
    },
  ]);

  // State for filter values
  const [filters, setFilters] = useState({
    activationStatus: '',
    proxyNumber: '',
    maskedNumber: '',
    cardType: '',
    issuanceType: '',
    customerHashId: '',
    clientId: '',
    cardHash: '',
    firstName: '',
    lastName: '',
    action: '',
  });

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter the cards based on the current filter values
  const filteredTableCards = cards.filter((card) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true; // If filter is empty, don't filter by this key
      return String(card[key]).toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  const [newCard, setNewCard] = useState({
    cardholderName: '',
    firstName: '',
    lastName: '',
    cardType: 'Debit',
    cardFormat: 'Physical',
    issuanceType: 'Physical',
    status: 'Active',
    activationStatus: 'Not Activated',
    proxyNumber: '',
    maskedNumber: '',
    customerHashId: '',
    clientId: '',
    cardHashId: ''
  });


  const handleIssueCard = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    customAlert('New card issued successfully!');
    setShowIssueCardModal(false);
    // Reset form
    setNewCard({
      cardholderName: '',
      firstName: '',
      lastName: '',
      cardType: 'Debit',
      cardFormat: 'Physical',
      issuanceType: 'Physical',
      status: 'Active',
      activationStatus: 'Not Activated',
      proxyNumber: '',
      maskedNumber: '',
      customerHashId: '',
      clientId: '',
      cardHashId: ''
    });
  };
  

  const handleViewCard = (card) => {
    setSelectedCard(card);
    setShowViewCardModal(true);
  };
  

  const handleBlockCard = (card) => {
    setSelectedCard(card);
    setShowBlockCardModal(true);
  };
  

  const handleDeleteCard = (card) => {
    setSelectedCard(card);
    setShowDeleteCardModal(true);
  };
  

  const confirmBlockCard = () => {
    // In a real app, this would send data to an API
    customAlert(`Card ${selectedCard.cardNumber} has been blocked successfully!`);
    setShowBlockCardModal(false);
    // Update the card status in the list (for demo purposes)
    const updatedCardList = cardListData.map(card => 
      card.id === selectedCard.id ? { ...card, status: 'Blocked' } : card
    );
    // In a real app, you would update the state with the new list
    // For this demo, we're just showing the alert
  };
  

  const confirmDeleteCard = () => {
    // In a real app, this would send data to an API
    customAlert(`Card ${selectedCard.cardNumber} has been deleted successfully!`);
    setShowDeleteCardModal(false);
    // In a real app, you would remove the card from the list
    // For this demo, we're just showing the alert
  };
  

  const filteredCards = cardListData.filter(card => {
    return (
      (searchTerm === '' || 
        card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.proxyNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (cardTypeFilter === '' || card.cardType === cardTypeFilter) &&
      (statusFilter === '' || card.status === statusFilter)
    );
  });
  
  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout title="Cards Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Cards Management</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => customAlert('Assign Card functionality would be implemented here')}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out shadow-md"
          >
            Assign Card
          </button>
          <button 
            onClick={() => setShowIssueCardModal(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
          >
            Issue New Card
          </button>
        </div>
      </div>

      {/* Card Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Cards Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Cards</p>
            <p className="text-2xl font-bold text-gray-900">12,500</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        </div>

        {/* Active Cards Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Cards</p>
            <p className="text-2xl font-bold text-gray-900">8,125</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Cards Issued This Month Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Cards Issued (Month)</p>
            <p className="text-2xl font-bold text-gray-900">1,250</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Transaction Volume Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Transaction Volume</p>
            <p className="text-2xl font-bold text-gray-900">₹6.25M</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Card Analytics Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Card Analytics</h3>
        <p className="text-gray-700 mb-6">
          View detailed analytics about card issuance, usage, and distribution across different categories.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Issuance Chart */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Card Issuance Trends</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cardIssuanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="physical" fill="#8884d8" name="Physical Cards" />
                  <Bar dataKey="virtual" fill="#82ca9d" name="Virtual Cards" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Card Status Distribution */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Card Status Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cardStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {cardStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Card Type Distribution */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Card Type Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cardTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {cardTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Card Usage Trends */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Card Usage Trends</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={cardUsageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="transactions" fill="#8884d8" name="Transactions" />
                  <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#ff7300" name="Volume (₹)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cards List Table */}
      <div className="min-h-screen bg-gray-100 p-4 font-sans flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Cards List</h1>

        {/* Table Container */}
        <div className="w-full max-w-7xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Scrollable area for the table */}
          <div className="overflow-x-auto overflow-y-auto max-h-[80vh] rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {/* Table Headers with Filters */}
                  {[
                    { name: 'activationStatus', label: 'ACTIVATION STATUS' },
                    { name: 'proxyNumber', label: 'PROXY NUMBER' },
                    { name: 'maskedNumber', label: 'MASKED NUMBER' },
                    { name: 'cardType', label: 'CARD TYPE' },
                    { name: 'issuanceType', label: 'ISSUANCE TYPE' },
                    { name: 'customerHashId', label: 'CUSTOMER HASH ID' },
                    { name: 'clientId', label: 'CLIENT ID' },
                    { name: 'cardHash', label: 'CARD HAS' },
                    { name: 'firstName', label: 'FIRST NAME' },
                    { name: 'lastName', label: 'LAST NAME' },
                    { name: 'action', label: 'ACTION' },
                  ].map((header) => (
                    <th
                      key={header.name}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      <div className="flex flex-col">
                        <span>{header.label}</span>
                        {/* Filter input fields */}
                        {header.name === 'activationStatus' ? (
                          <select
                            name={header.name}
                            value={filters[header.name]}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                          >
                            <option value="">Please Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        ) : header.name === 'cardType' ? (
                          <select
                            name={header.name}
                            value={filters[header.name]}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                          >
                            <option value="">Please Select Card Type</option>
                            <option value="NA">NA</option>
                            <option value="GC PHYSICAL">GC PHYSICAL</option>
                            <option value="VIRTUAL">VIRTUAL</option>
                            <option value="PHYSICAL">PHYSICAL</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={header.name}
                            value={filters[header.name]}
                            onChange={handleFilterChange}
                            placeholder={`Search ${header.label.toLowerCase()}`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50">
                      {/* Activation Status Cell with colored indicator */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold leading-tight ${
                              card.activationStatus === 'ACTIVE'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {card.activationStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.proxyNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.maskedNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.cardType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.issuanceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.customerHashId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.clientId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.cardHash}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.firstName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{card.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-xs font-medium">View</button>
                          <button className="text-blue-600 hover:text-blue-900 text-xs font-medium">Edit</button>
                          <button className="text-red-600 hover:text-red-900 text-xs font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                      No cards found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issue Card Modal */}
      {showIssueCardModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Issue New Card</h3>
            <form onSubmit={handleIssueCard}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={newCard.firstName}
                    onChange={(e) => setNewCard({
                      ...newCard, 
                      firstName: e.target.value,
                      cardholderName: e.target.value + (newCard.lastName ? ' ' + newCard.lastName : '')
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={newCard.lastName}
                    onChange={(e) => setNewCard({
                      ...newCard, 
                      lastName: e.target.value,
                      cardholderName: newCard.firstName + ' ' + e.target.value
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardType">
                  Card Type
                </label>
                <select
                  id="cardType"
                  value={newCard.cardType}
                  onChange={(e) => setNewCard({...newCard, cardType: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                  <option value="Prepaid">Prepaid</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issuanceType">
                  Issuance Type
                </label>
                <select
                  id="issuanceType"
                  value={newCard.issuanceType}
                  onChange={(e) => setNewCard({...newCard, issuanceType: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Physical">Physical</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  value={newCard.status}
                  onChange={(e) => setNewCard({...newCard, status: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientId">
                  Client ID
                </label>
                <input
                  id="clientId"
                  type="text"
                  value={newCard.clientId}
                  onChange={(e) => setNewCard({...newCard, clientId: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Client ID"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowIssueCardModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Issue Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Card Modal */}
      {showViewCardModal && selectedCard && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Card Details</h3>
              <button 
                onClick={() => setShowViewCardModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Card Number</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.cardNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Masked Number</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.maskedNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Proxy Number</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.proxyNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cardholder Name</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.cardholderName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">First Name</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Name</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Card Type</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.cardType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Issuance Type</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.issuanceType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Issue Date</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.issueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCard.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    selectedCard.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    selectedCard.status === 'Blocked' ? 'bg-red-100 text-red-800' : 
                    selectedCard.status === 'Expired' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedCard.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Activation Status</p>
                <p className="mt-1 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCard.activationStatus === 'Activated' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedCard.activationStatus}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Customer Hash ID</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.customerHashId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Client ID</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.clientId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Card Hash ID</p>
                <p className="mt-1 text-sm text-gray-900">{selectedCard.cardHashId}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowViewCardModal(false);
                  handleBlockCard(selectedCard);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Block Card
              </button>
              <button
                onClick={() => setShowViewCardModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Card Modal */}
      {showBlockCardModal && selectedCard && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Block Card</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to block the card <span className="font-semibold">{selectedCard.cardNumber}</span> issued to <span className="font-semibold">{selectedCard.cardholderName}</span>?
            </p>
            <p className="mb-6 text-sm text-gray-500">
              This action will prevent any further transactions on this card. It can be unblocked later if needed.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowBlockCardModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockCard}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Block Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Card Modal */}
      {showDeleteCardModal && selectedCard && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Card</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete the card <span className="font-semibold">{selectedCard.cardNumber}</span> issued to <span className="font-semibold">{selectedCard.cardholderName}</span>?
            </p>
            <p className="mb-6 text-sm text-red-500 font-medium">
              Warning: This action cannot be undone. The card will be permanently removed from the system.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteCardModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCard}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Cards;