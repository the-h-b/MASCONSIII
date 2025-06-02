import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const AnchorManagement = () => {
  // State for form data
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    selectedPrograms: [],
    creditLimit: '',
    tags: []
  });

  // State for ROI and margin settings per program
  const [programSettings, setProgramSettings] = useState([]);
  
  // State for anchors list
  const [anchors, setAnchors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnchorId, setCurrentAnchorId] = useState(null);
  
  // State for available programs
  const [availablePrograms, setAvailablePrograms] = useState([]);
  
  // State for available tags
  const [availableTags, setAvailableTags] = useState([
    'Manufacturing', 'Retail', 'Healthcare', 'Technology', 'Agriculture', 'Logistics'
  ]);

  // Mock fetch programs (replace with actual API call)
  useEffect(() => {
    // Simulating API call for programs
    const mockPrograms = [
      { id: 1, name: 'Supply Chain Finance Program', defaultROI: 8.5 },
      { id: 2, name: 'Invoice Discounting', defaultROI: 7.2 },
      { id: 3, name: 'Distributor Financing', defaultROI: 9.0 }
    ];
    
    setAvailablePrograms(mockPrograms);
    
    // Simulating API call for anchors
    const mockAnchors = [
      {
        id: 1,
        companyName: 'ABC Corporation',
        email: 'contact@abccorp.com',
        phone: '123-456-7890',
        industry: 'Manufacturing',
        selectedPrograms: [1, 2],
        programSettings: [
          { programId: 1, customROI: 8.0, margin: 1.5 },
          { programId: 2, customROI: 6.8, margin: 1.2 }
        ],
        creditLimit: 5000000,
        tags: ['Manufacturing', 'Technology']
      },
      {
        id: 2,
        companyName: 'XYZ Enterprises',
        email: 'info@xyzent.com',
        phone: '987-654-3210',
        industry: 'Retail',
        selectedPrograms: [2, 3],
        programSettings: [
          { programId: 2, customROI: 7.0, margin: 1.0 },
          { programId: 3, customROI: 8.5, margin: 1.8 }
        ],
        creditLimit: 3000000,
        tags: ['Retail', 'Logistics']
      }
    ];
    
    setAnchors(mockAnchors);
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
    let updatedSettings = [...programSettings];
    
    if (isChecked) {
      updatedPrograms.push(programId);
      
      // Find the program to get default ROI
      const program = availablePrograms.find(p => p.id === programId);
      
      // Add default settings for the selected program
      updatedSettings.push({
        programId,
        customROI: program.defaultROI,
        margin: 1.0 // Default margin
      });
    } else {
      updatedPrograms = updatedPrograms.filter(id => id !== programId);
      updatedSettings = updatedSettings.filter(setting => setting.programId !== programId);
    }
    
    setFormData({
      ...formData,
      selectedPrograms: updatedPrograms
    });
    
    setProgramSettings(updatedSettings);
  };

  // Handle program settings change
  const handleSettingsChange = (programId, field, value) => {
    const updatedSettings = programSettings.map(setting => {
      if (setting.programId === programId) {
        return { ...setting, [field]: parseFloat(value) };
      }
      return setting;
    });
    
    setProgramSettings(updatedSettings);
  };

  // Handle tag selection
  const handleTagSelection = (tag) => {
    let updatedTags = [...formData.tags];
    
    if (updatedTags.includes(tag)) {
      updatedTags = updatedTags.filter(t => t !== tag);
    } else {
      updatedTags.push(tag);
    }
    
    setFormData({
      ...formData,
      tags: updatedTags
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const anchorData = {
      ...formData,
      programSettings
    };
    
    if (isEditing) {
      // Update existing anchor
      const updatedAnchors = anchors.map(anchor => 
        anchor.id === currentAnchorId ? { ...anchor, ...anchorData, id: currentAnchorId } : anchor
      );
      setAnchors(updatedAnchors);
      toast.success('Anchor updated successfully!');
      setIsEditing(false);
      setCurrentAnchorId(null);
    } else {
      // Add new anchor
      const newAnchor = {
        id: Date.now(), // temporary ID
        ...anchorData
      };
      setAnchors([...anchors, newAnchor]);
      toast.success('Anchor created successfully!');
    }
    
    // Reset form
    setFormData({
      companyName: '',
      email: '',
      phone: '',
      industry: '',
      selectedPrograms: [],
      creditLimit: '',
      tags: []
    });
    setProgramSettings([]);
  };

  // Handle edit anchor
  const handleEdit = (anchor) => {
    setFormData({
      companyName: anchor.companyName,
      email: anchor.email,
      phone: anchor.phone,
      industry: anchor.industry,
      selectedPrograms: anchor.selectedPrograms,
      creditLimit: anchor.creditLimit,
      tags: anchor.tags
    });
    setProgramSettings(anchor.programSettings);
    setIsEditing(true);
    setCurrentAnchorId(anchor.id);
  };

  // Handle delete anchor
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this anchor?')) {
      const filteredAnchors = anchors.filter(anchor => anchor.id !== id);
      setAnchors(filteredAnchors);
      toast.success('Anchor deleted successfully!');
    }
  };

  return (
    <AdminLayout title="Anchor Management">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Anchor Management</h1>
      
      {/* Anchor Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit Anchor' : 'Onboard New Anchor'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
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
                Industry Category
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Industry</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Technology">Technology</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Logistics">Logistics</option>
              </select>
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
            
            {formData.selectedPrograms.length > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom ROI & Margin Settings per Program
                </label>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom ROI (%)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin (%)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {programSettings.map(setting => {
                        const program = availablePrograms.find(p => p.id === setting.programId);
                        return (
                          <tr key={setting.programId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {program.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                step="0.1"
                                value={setting.customROI}
                                onChange={(e) => handleSettingsChange(setting.programId, 'customROI', e.target.value)}
                                className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                step="0.1"
                                value={setting.margin}
                                onChange={(e) => handleSettingsChange(setting.programId, 'margin', e.target.value)}
                                className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financero Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagSelection(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.tags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
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
                  setCurrentAnchorId(null);
                  setFormData({
                    companyName: '',
                    email: '',
                    phone: '',
                    industry: '',
                    selectedPrograms: [],
                    creditLimit: '',
                    tags: []
                  });
                  setProgramSettings([]);
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
              {isEditing ? 'Update Anchor' : 'Save Anchor'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Anchors List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Anchors List</h2>
        
        {anchors.length === 0 ? (
          <p className="text-gray-500">No anchors found. Create your first anchor above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {anchors.map((anchor) => (
                  <tr key={anchor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{anchor.companyName}</div>
                      <div className="flex mt-1">
                        {anchor.tags.map(tag => (
                          <span key={tag} className="mr-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{anchor.email}</div>
                      <div className="text-sm text-gray-500">{anchor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {anchor.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {anchor.selectedPrograms.map(programId => {
                        const program = availablePrograms.find(p => p.id === programId);
                        return program ? (
                          <div key={programId} className="mb-1">
                            {program.name}
                          </div>
                        ) : null;
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${anchor.creditLimit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(anchor)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(anchor.id)}
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

export default AnchorManagement;