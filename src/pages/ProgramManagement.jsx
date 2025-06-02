import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const ProgramManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    programName: '',
    description: '',
    defaultROI: '',
    repaymentTerms: '30',
    processingFees: '',
    riskParameters: ''
  });

  // State for programs list
  const [programs, setPrograms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProgramId, setCurrentProgramId] = useState(null);

  // Mock fetch programs (replace with actual API call)
  useEffect(() => {
    // Simulating API call
    const mockPrograms = [
      {
        id: 1,
        programName: 'Supply Chain Finance Program',
        description: 'Standard financing program for suppliers',
        defaultROI: 8.5,
        repaymentTerms: '30',
        processingFees: 1.2,
        riskParameters: 'Low risk tolerance',
        isActive: true
      },
      {
        id: 2,
        programName: 'Invoice Discounting',
        description: 'Early payment program based on invoice discounting',
        defaultROI: 7.2,
        repaymentTerms: '60',
        processingFees: 0.8,
        riskParameters: 'Medium risk tolerance',
        isActive: true
      },
      {
        id: 3,
        programName: 'Distributor Financing',
        description: 'Financing for distributors to purchase inventory',
        defaultROI: 9.0,
        repaymentTerms: '90',
        processingFees: 1.5,
        riskParameters: 'Minimum order volume, 1+ year relationship',
        isActive: false
      }
    ];
    
    setPrograms(mockPrograms);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing program
      const updatedPrograms = programs.map(program => 
        program.id === currentProgramId ? { ...program, ...formData } : program
      );
      setPrograms(updatedPrograms);
      toast.success('Program updated successfully!');
      setIsEditing(false);
      setCurrentProgramId(null);
    } else {
      // Add new program
      const newProgram = {
        id: Date.now(), // temporary ID
        ...formData
      };
      setPrograms([...programs, newProgram]);
      toast.success('Program created successfully!');
    }
    
    // Reset form
    setFormData({
      programName: '',
      description: '',
      defaultROI: '',
      repaymentTerms: '30',
      processingFees: '',
      riskParameters: ''
    });
  };

  // Handle edit program
  const handleEdit = (program) => {
    setFormData({
      programName: program.programName,
      description: program.description,
      defaultROI: program.defaultROI,
      repaymentTerms: program.repaymentTerms,
      processingFees: program.processingFees,
      riskParameters: program.riskParameters
    });
    setIsEditing(true);
    setCurrentProgramId(program.id);
  };

  // Handle toggle program status
  const handleToggleStatus = (id) => {
    const updatedPrograms = programs.map(program => {
      if (program.id === id) {
        return { ...program, isActive: !program.isActive };
      }
      return program;
    });
    
    setPrograms(updatedPrograms);
    
    const program = programs.find(p => p.id === id);
    const statusMessage = program.isActive ? 'deactivated' : 'activated';
    toast.success(`Program ${statusMessage} successfully!`);
  };

  // Handle delete program
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      const filteredPrograms = programs.filter(program => program.id !== id);
      setPrograms(filteredPrograms);
      toast.success('Program deleted successfully!');
    }
  };

  return (
    <AdminLayout title="Program Management">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Program Management</h1>
      
      {/* Program Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit Program' : 'Create New Program'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Name
              </label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default ROI (%)
              </label>
              <input
                type="number"
                step="0.01"
                name="defaultROI"
                value={formData.defaultROI}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repayment Terms
              </label>
              <select
                name="repaymentTerms"
                value={formData.repaymentTerms}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Processing Fees (%)
              </label>
              <input
                type="number"
                step="0.01"
                name="processingFees"
                value={formData.processingFees}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Parameters (Optional)
              </label>
              <textarea
                name="riskParameters"
                value={formData.riskParameters}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProgramId(null);
                  setFormData({
                    programName: '',
                    description: '',
                    defaultROI: '',
                    repaymentTerms: '30',
                    processingFees: '',
                    riskParameters: ''
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
              {isEditing ? 'Update Program' : 'Save Program'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Programs List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Programs List</h2>
        
        {programs.length === 0 ? (
          <p className="text-gray-500">No programs found. Create your first program above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default ROI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repayment Terms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{program.programName}</div>
                      <div className="text-sm text-gray-500">{program.description.substring(0, 50)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.defaultROI}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.repaymentTerms} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {program.processingFees}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        program.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {program.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(program)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(program.id)}
                        className={`${
                          program.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        } mr-3`}
                      >
                        {program.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
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

export default ProgramManagement;