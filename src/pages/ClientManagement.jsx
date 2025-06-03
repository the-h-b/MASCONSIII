import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const ClientManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    selectedAnchor: '',
    selectedProgram: '',
    riskScore: ''
  });

  // State for clients list
  const [clients, setClients] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);
  
  // State for available anchors and programs
  const [availableAnchors, setAvailableAnchors] = useState([]);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  
  // State for ROI and margin display
  const [inheritedROI, setInheritedROI] = useState('');
  const [inheritedMargin, setInheritedMargin] = useState('');

  // Mock fetch data (replace with actual API calls)
  useEffect(() => {
    // Simulating API call for anchors
    const mockAnchors = [
      { 
        id: 1, 
        name: 'ABC Corporation',
        programs: [
          { programId: 1, customROI: 8.0, margin: 1.5 },
          { programId: 2, customROI: 6.8, margin: 1.2 }
        ]
      },
      { 
        id: 2, 
        name: 'XYZ Enterprises',
        programs: [
          { programId: 2, customROI: 7.0, margin: 1.0 },
          { programId: 3, customROI: 8.5, margin: 1.8 }
        ]
      }
    ];
    
    // Simulating API call for programs
    const mockPrograms = [
      { id: 1, name: 'Supply Chain Finance Program', defaultROI: 8.5 },
      { id: 2, name: 'Invoice Discounting', defaultROI: 7.2 },
      { id: 3, name: 'Distributor Financing', defaultROI: 9.0 }
    ];
    
    // Simulating API call for clients
    const mockClients = [
      {
        id: 1,
        businessName: 'Small Supplier Co.',
        email: 'contact@smallsupplier.com',
        phone: '123-456-7890',
        anchorId: 1,
        programId: 1,
        inheritedROI: 8.0,
        inheritedMargin: 1.5,
        riskScore: 75
      },
      {
        id: 2,
        businessName: 'Medium Distributor Ltd.',
        email: 'info@mediumdistributor.com',
        phone: '987-654-3210',
        anchorId: 2,
        programId: 3,
        inheritedROI: 8.5,
        inheritedMargin: 1.8,
        riskScore: 82
      }
    ];
    
    setAvailableAnchors(mockAnchors);
    setAvailablePrograms(mockPrograms);
    setClients(mockClients);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // If anchor selection changes, filter programs
    if (name === 'selectedAnchor') {
      const anchorId = parseInt(value);
      handleAnchorChange(anchorId);
    }
    
    // If program selection changes, update ROI and margin
    if (name === 'selectedProgram') {
      const programId = parseInt(value);
      handleProgramChange(programId);
    }
  };

  // Handle anchor change
  const handleAnchorChange = (anchorId) => {
    // Reset program selection
    setFormData(prev => ({
      ...prev,
      selectedProgram: ''
    }));
    
    setInheritedROI('');
    setInheritedMargin('');
    
    if (!anchorId) {
      setFilteredPrograms([]);
      return;
    }
    
    // Find the selected anchor
    const selectedAnchor = availableAnchors.find(anchor => anchor.id === anchorId);
    
    if (selectedAnchor) {
      // Get programs associated with this anchor
      const anchorPrograms = selectedAnchor.programs.map(p => p.programId);
      const filtered = availablePrograms.filter(program => anchorPrograms.includes(program.id));
      setFilteredPrograms(filtered);
    } else {
      setFilteredPrograms([]);
    }
  };

  // Handle program change
  const handleProgramChange = (programId) => {
    if (!programId || !formData.selectedAnchor) {
      setInheritedROI('');
      setInheritedMargin('');
      return;
    }
    
    const anchorId = parseInt(formData.selectedAnchor);
    
    // Find the selected anchor
    const selectedAnchor = availableAnchors.find(anchor => anchor.id === anchorId);
    
    if (selectedAnchor) {
      // Find the program settings for this anchor
      const programSetting = selectedAnchor.programs.find(p => p.programId === programId);
      
      if (programSetting) {
        setInheritedROI(programSetting.customROI);
        setInheritedMargin(programSetting.margin);
      } else {
        setInheritedROI('');
        setInheritedMargin('');
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const clientData = {
      ...formData,
      anchorId: parseInt(formData.selectedAnchor),
      programId: parseInt(formData.selectedProgram),
      inheritedROI,
      inheritedMargin,
      riskScore: formData.riskScore ? parseInt(formData.riskScore) : null
    };
    
    if (isEditing) {
      // Update existing client
      const updatedClients = clients.map(client => 
        client.id === currentClientId ? { ...client, ...clientData, id: currentClientId } : client
      );
      setClients(updatedClients);
      toast.success('Client updated successfully!');
      setIsEditing(false);
      setCurrentClientId(null);
    } else {
      // Add new client
      const newClient = {
        id: Date.now(), // temporary ID
        ...clientData
      };
      setClients([...clients, newClient]);
      toast.success('Client created successfully!');
    }
    
    // Reset form
    setFormData({
      businessName: '',
      email: '',
      phone: '',
      selectedAnchor: '',
      selectedProgram: '',
      riskScore: ''
    });
    setInheritedROI('');
    setInheritedMargin('');
  };

  // Handle edit client
  const handleEdit = (client) => {
    // Find anchor and program names
    const anchorId = client.anchorId;
    const programId = client.programId;
    
    // Set filtered programs based on anchor
    handleAnchorChange(anchorId);
    
    setFormData({
      businessName: client.businessName,
      email: client.email,
      phone: client.phone,
      selectedAnchor: anchorId.toString(),
      selectedProgram: programId.toString(),
      riskScore: client.riskScore ? client.riskScore.toString() : ''
    });
    
    setInheritedROI(client.inheritedROI);
    setInheritedMargin(client.inheritedMargin);
    setIsEditing(true);
    setCurrentClientId(client.id);
  };

  // Handle delete client
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const filteredClients = clients.filter(client => client.id !== id);
      setClients(filteredClients);
      toast.success('Client deleted successfully!');
    }
  };

  return (
    <AdminLayout title="Client Management">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Client Management</h1>
      
      {/* Client Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit Client' : 'Onboard New Client'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to Anchor
              </label>
              <select
                name="selectedAnchor"
                value={formData.selectedAnchor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Anchor</option>
                {availableAnchors.map(anchor => (
                  <option key={anchor.id} value={anchor.id}>
                    {anchor.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to Program
              </label>
              <select
                name="selectedProgram"
                value={formData.selectedProgram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!formData.selectedAnchor}
              >
                <option value="">Select Program</option>
                {filteredPrograms.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              {!formData.selectedAnchor && (
                <p className="mt-1 text-sm text-gray-500">Please select an anchor first</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Score (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                name="riskScore"
                value={formData.riskScore}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inherited ROI
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {inheritedROI ? `${inheritedROI}%` : 'N/A'}
              </div>
              <p className="mt-1 text-xs text-gray-500">Auto-populated from anchor/program config</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inherited Margin
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {inheritedMargin ? `${inheritedMargin}%` : 'N/A'}
              </div>
              <p className="mt-1 text-xs text-gray-500">Auto-populated from anchor/program config</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentClientId(null);
                  setFormData({
                    businessName: '',
                    email: '',
                    phone: '',
                    selectedAnchor: '',
                    selectedProgram: '',
                    riskScore: ''
                  });
                  setInheritedROI('');
                  setInheritedMargin('');
                }}
                className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? 'Update Client' : 'Save Client'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Clients List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Clients List</h2>
        
        {clients.length === 0 ? (
          <p className="text-gray-500">No clients found. Create your first client above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anchor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI & Margin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => {
                  // Find anchor and program names
                  const anchor = availableAnchors.find(a => a.id === client.anchorId);
                  const program = availablePrograms.find(p => p.id === client.programId);
                  
                  return (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{client.businessName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {anchor ? anchor.name : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {program ? program.name : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">ROI: {client.inheritedROI}%</div>
                        <div className="text-sm text-gray-500">Margin: {client.inheritedMargin}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.riskScore ? client.riskScore : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(client)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientManagement;