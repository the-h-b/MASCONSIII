import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const LenderManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    lenderName: '',
    regulatoryId: '',
    selectedPrograms: [],
    selectedAnchors: [],
    minROI: '',
    maxROI: '',
    creditLimit: '',
    settlementPreference: 'daily'
  });

  // State for lenders list
  const [lenders, setLenders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLenderId, setCurrentLenderId] = useState(null);
  
  // State for available programs and anchors
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableAnchors, setAvailableAnchors] = useState([]);

  // Mock fetch data (replace with actual API calls)
  useEffect(() => {
    // Simulating API call for programs
    const mockPrograms = [
      { id: 1, name: 'Supply Chain Finance Program' },
      { id: 2, name: 'Invoice Discounting' },
      { id: 3, name: 'Distributor Financing' }
    ];
    
    // Simulating API call for anchors
    const mockAnchors = [
      { id: 1, name: 'ABC Corporation' },
      { id: 2, name: 'XYZ Enterprises' },
      { id: 3, name: 'Global Industries Ltd.' }
    ];
    
    // Simulating API call for lenders
    const mockLenders = [
      {
        id: 1,
        lenderName: 'First National Bank',
        regulatoryId: 'FNB12345',
        selectedPrograms: [1, 2],
        selectedAnchors: [1, 3],
        minROI: 6.5,
        maxROI: 9.0,
        creditLimit: 10000000,
        settlementPreference: 'weekly'
      },
      {
        id: 2,
        lenderName: 'Global Finance NBFC',
        regulatoryId: 'GFNBFC789',
        selectedPrograms: [2, 3],
        selectedAnchors: [2],
        minROI: 7.0,
        maxROI: 10.5,
        creditLimit: 5000000,
        settlementPreference: 'daily'
      }
    ];
    
    setAvailablePrograms(mockPrograms);
    setAvailableAnchors(mockAnchors);
    setLenders(mockLenders);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle program selection
  const handleProgramSelection = (e) => {
    const programId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    
    let updatedPrograms = [...formData.selectedPrograms];
    
    if (isChecked) {
      updatedPrograms.push(programId);
    } else {
      updatedPrograms = updatedPrograms.filter(id => id !== programId);
    }
    
    setFormData({
      ...formData,
      selectedPrograms: updatedPrograms
    });
  };

  // Handle anchor selection
  const handleAnchorSelection = (e) => {
    const anchorId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    
    let updatedAnchors = [...formData.selectedAnchors];
    
    if (isChecked) {
      updatedAnchors.push(anchorId);
    } else {
      updatedAnchors = updatedAnchors.filter(id => id !== anchorId);
    }
    
    setFormData({
      ...formData,
      selectedAnchors: updatedAnchors
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing lender
      const updatedLenders = lenders.map(lender => 
        lender.id === currentLenderId ? { ...lender, ...formData, id: currentLenderId } : lender
      );
      setLenders(updatedLenders);
      toast.success('Lender updated successfully!');
      setIsEditing(false);
      setCurrentLenderId(null);
    } else {
      // Add new lender
      const newLender = {
        id: Date.now(), // temporary ID
        ...formData
      };
      setLenders([...lenders, newLender]);
      toast.success('Lender created successfully!');
    }
    
    // Reset form
    setFormData({
      lenderName: '',
      regulatoryId: '',
      selectedPrograms: [],
      selectedAnchors: [],
      minROI: '',
      maxROI: '',
      creditLimit: '',
      settlementPreference: 'daily'
    });
  };

  // Handle edit lender
  const handleEdit = (lender) => {
    setFormData({
      lenderName: lender.lenderName,
      regulatoryId: lender.regulatoryId,
      selectedPrograms: lender.selectedPrograms,
      selectedAnchors: lender.selectedAnchors,
      minROI: lender.minROI,
      maxROI: lender.maxROI,
      creditLimit: lender.creditLimit,
      settlementPreference: lender.settlementPreference
    });
    setIsEditing(true);
    setCurrentLenderId(lender.id);
  };

  // Handle delete lender
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lender?')) {
      const filteredLenders = lenders.filter(lender => lender.id !== id);
      setLenders(filteredLenders);
      toast.success('Lender deleted successfully!');
    }
  };

  return (
    <AdminLayout title="Lender Management">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Lender Management</h1>
      
      {/* Lender Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit Lender' : 'Onboard New Lender'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lender Name
              </label>
              <input
                type="text"
                name="lenderName"
                value={formData.lenderName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Regulatory ID
              </label>
              <input
                type="text"
                name="regulatoryId"
                value={formData.regulatoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum ROI (%)
              </label>
              <input
                type="number"
                step="0.1"
                name="minROI"
                value={formData.minROI}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum ROI (%)
              </label>
              <input
                type="number"
                step="0.1"
                name="maxROI"
                value={formData.maxROI}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Limit
              </label>
              <input
                type="number"
                name="creditLimit"
                value={formData.creditLimit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Settlement Preference
              </label>
              <select
                name="settlementPreference"
                value={formData.settlementPreference}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to Program(s)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availablePrograms.map(program => (
                  <div key={program.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`program-${program.id}`}
                      value={program.id}
                      checked={formData.selectedPrograms.includes(program.id)}
                      onChange={handleProgramSelection}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`program-${program.id}`} className="ml-2 text-sm text-gray-700">
                      {program.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to Anchors (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableAnchors.map(anchor => (
                  <div key={anchor.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`anchor-${anchor.id}`}
                      value={anchor.id}
                      checked={formData.selectedAnchors.includes(anchor.id)}
                      onChange={handleAnchorSelection}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`anchor-${anchor.id}`} className="ml-2 text-sm text-gray-700">
                      {anchor.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentLenderId(null);
                  setFormData({
                    lenderName: '',
                    regulatoryId: '',
                    selectedPrograms: [],
                    selectedAnchors: [],
                    minROI: '',
                    maxROI: '',
                    creditLimit: '',
                    settlementPreference: 'daily'
                  });
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
              {isEditing ? 'Update Lender' : 'Save Lender'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Lenders List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Lenders List</h2>
        
        {lenders.length === 0 ? (
          <p className="text-gray-500">No lenders found. Create your first lender above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulatory ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settlement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lenders.map((lender) => (
                  <tr key={lender.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lender.lenderName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.regulatoryId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.minROI}% - {lender.maxROI}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${lender.creditLimit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lender.selectedPrograms.map(programId => {
                        const program = availablePrograms.find(p => p.id === programId);
                        return program ? (
                          <div key={programId} className="mb-1">
                            {program.name}
                          </div>
                        ) : null;
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {lender.settlementPreference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(lender)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lender.id)}
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
        )}
      </div>
    </AdminLayout>
  );
};

export default LenderManagement;