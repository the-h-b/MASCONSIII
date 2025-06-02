import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../components/AdminLayout';

const AdminControls = () => {
  // State for tabs
  const [activeTab, setActiveTab] = useState('modifyPrograms');
  
  // State for program modification
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [programForm, setProgramForm] = useState({
    defaultROI: '',
    repaymentTerms: '',
    processingFees: '',
    isActive: true
  });
  
  // State for entity reassignment
  const [entityType, setEntityType] = useState('client');
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [reassignmentTargets, setReassignmentTargets] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState('');
  
  // State for audit logs
  const [auditLogs, setAuditLogs] = useState([]);
  const [logFilters, setLogFilters] = useState({
    entityType: '',
    startDate: '',
    endDate: ''
  });
  const [filteredLogs, setFilteredLogs] = useState([]);

  // Mock fetch data (replace with actual API calls)
  useEffect(() => {
    // Simulating API call for programs
    const mockPrograms = [
      { 
        id: 1, 
        name: 'Supply Chain Finance Program', 
        defaultROI: 8.5, 
        repaymentTerms: '30', 
        processingFees: 1.2,
        isActive: true
      },
      { 
        id: 2, 
        name: 'Invoice Discounting', 
        defaultROI: 7.2, 
        repaymentTerms: '60', 
        processingFees: 0.8,
        isActive: true
      },
      { 
        id: 3, 
        name: 'Distributor Financing', 
        defaultROI: 9.0, 
        repaymentTerms: '90', 
        processingFees: 1.5,
        isActive: false
      }
    ];
    
    // Simulating API call for entities (clients, anchors, lenders)
    const mockClients = [
      { id: 1, name: 'Small Supplier Co.', type: 'client', parent: 'ABC Corporation' },
      { id: 2, name: 'Medium Distributor Ltd.', type: 'client', parent: 'XYZ Enterprises' }
    ];
    
    const mockAnchors = [
      { id: 1, name: 'ABC Corporation', type: 'anchor' },
      { id: 2, name: 'XYZ Enterprises', type: 'anchor' }
    ];
    
    const mockLenders = [
      { id: 1, name: 'First National Bank', type: 'lender' },
      { id: 2, name: 'Global Finance NBFC', type: 'lender' }
    ];
    
    // Simulating API call for audit logs
    const mockAuditLogs = [
      { 
        id: 1, 
        user: 'admin@example.com', 
        action: 'Created Program', 
        entity: 'Supply Chain Finance Program', 
        entityType: 'program',
        timestamp: '2023-06-15T10:30:00Z' 
      },
      { 
        id: 2, 
        user: 'admin@example.com', 
        action: 'Onboarded Anchor', 
        entity: 'ABC Corporation', 
        entityType: 'anchor',
        timestamp: '2023-06-16T14:45:00Z' 
      },
      { 
        id: 3, 
        user: 'manager@example.com', 
        action: 'Modified ROI', 
        entity: 'Invoice Discounting', 
        entityType: 'program',
        timestamp: '2023-06-18T09:15:00Z' 
      },
      { 
        id: 4, 
        user: 'admin@example.com', 
        action: 'Onboarded Client', 
        entity: 'Small Supplier Co.', 
        entityType: 'client',
        timestamp: '2023-06-20T11:20:00Z' 
      },
      { 
        id: 5, 
        user: 'manager@example.com', 
        action: 'Deactivated Program', 
        entity: 'Distributor Financing', 
        entityType: 'program',
        timestamp: '2023-06-22T16:05:00Z' 
      }
    ];
    
    setPrograms(mockPrograms);
    setEntities(mockClients); // Default to clients
    setReassignmentTargets(mockAnchors); // Default targets for clients are anchors
    setAuditLogs(mockAuditLogs);
    setFilteredLogs(mockAuditLogs);
    
    // Store all entities for reference
    window.allEntities = {
      client: mockClients,
      anchor: mockAnchors,
      lender: mockLenders
    };
  }, []);

  // Handle program selection
  const handleProgramSelect = (e) => {
    const programId = parseInt(e.target.value);
    setSelectedProgram(programId);
    
    if (programId) {
      const program = programs.find(p => p.id === programId);
      if (program) {
        setProgramForm({
          defaultROI: program.defaultROI,
          repaymentTerms: program.repaymentTerms,
          processingFees: program.processingFees,
          isActive: program.isActive
        });
      }
    } else {
      setProgramForm({
        defaultROI: '',
        repaymentTerms: '',
        processingFees: '',
        isActive: true
      });
    }
  };

  // Handle program form changes
  const handleProgramFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProgramForm({
      ...programForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle program update
  const handleProgramUpdate = (e) => {
    e.preventDefault();
    
    if (!selectedProgram) {
      toast.error('Please select a program to modify');
      return;
    }
    
    // Update program in state
    const updatedPrograms = programs.map(program => {
      if (program.id === selectedProgram) {
        return {
          ...program,
          defaultROI: parseFloat(programForm.defaultROI),
          repaymentTerms: programForm.repaymentTerms,
          processingFees: parseFloat(programForm.processingFees),
          isActive: programForm.isActive
        };
      }
      return program;
    });
    
    setPrograms(updatedPrograms);
    toast.success('Program updated successfully!');
  };

  // Handle entity type change
  const handleEntityTypeChange = (e) => {
    const type = e.target.value;
    setEntityType(type);
    setSelectedEntity('');
    
    // Set entities based on type
    if (type === 'client') {
      setEntities(window.allEntities.client);
      setReassignmentTargets(window.allEntities.anchor);
    } else if (type === 'anchor') {
      setEntities(window.allEntities.anchor);
      setReassignmentTargets(window.allEntities.lender);
    } else if (type === 'lender') {
      setEntities(window.allEntities.lender);
      setReassignmentTargets([]);
    }
  };

  // Handle entity reassignment
  const handleReassign = (e) => {
    e.preventDefault();
    
    if (!selectedEntity || !selectedTarget) {
      toast.error('Please select both entity and target for reassignment');
      return;
    }
    
    // In a real app, you would call an API to perform the reassignment
    toast.success(`Entity reassigned successfully!`);
    
    // Reset form
    setSelectedEntity('');
    setSelectedTarget('');
  };

  // Handle entity deactivation
  const handleDeactivate = (e) => {
    e.preventDefault();
    
    if (!selectedEntity) {
      toast.error('Please select an entity to deactivate');
      return;
    }
    
    // In a real app, you would call an API to perform the deactivation
    toast.success(`Entity deactivated successfully!`);
    
    // Reset form
    setSelectedEntity('');
  };

  // Handle audit log filter changes
  const handleLogFilterChange = (e) => {
    const { name, value } = e.target;
    setLogFilters({
      ...logFilters,
      [name]: value
    });
  };

  // Apply audit log filters
  const applyLogFilters = () => {
    let filtered = [...auditLogs];
    
    if (logFilters.entityType) {
      filtered = filtered.filter(log => log.entityType === logFilters.entityType);
    }
    
    if (logFilters.startDate) {
      const startDate = new Date(logFilters.startDate);
      filtered = filtered.filter(log => new Date(log.timestamp) >= startDate);
    }
    
    if (logFilters.endDate) {
      const endDate = new Date(logFilters.endDate);
      endDate.setHours(23, 59, 59); // End of day
      filtered = filtered.filter(log => new Date(log.timestamp) <= endDate);
    }
    
    setFilteredLogs(filtered);
  };

  // Reset audit log filters
  const resetLogFilters = () => {
    setLogFilters({
      entityType: '',
      startDate: '',
      endDate: ''
    });
    setFilteredLogs(auditLogs);
  };

  return (
    <AdminLayout title="Admin Controls">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Controls</h1>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('modifyPrograms')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'modifyPrograms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Modify Programs
            </button>
            <button
              onClick={() => setActiveTab('reassignEntities')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'reassignEntities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reassign / Deactivate Entities
            </button>
            <button
              onClick={() => setActiveTab('auditLogs')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'auditLogs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Audit Logs
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Modify Programs Tab */}
        {activeTab === 'modifyPrograms' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Modify Programs</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Program
              </label>
              <select
                value={selectedProgram}
                onChange={handleProgramSelect}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a program to modify</option>
                {programs.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name} {!program.isActive && '(Inactive)'}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedProgram && (
              <form onSubmit={handleProgramUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default ROI (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="defaultROI"
                      value={programForm.defaultROI}
                      onChange={handleProgramFormChange}
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
                      value={programForm.repaymentTerms}
                      onChange={handleProgramFormChange}
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
                      step="0.1"
                      name="processingFees"
                      value={programForm.processingFees}
                      onChange={handleProgramFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={programForm.isActive}
                      onChange={handleProgramFormChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                      Program Active
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update Program
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {/* Reassign / Deactivate Entities Tab */}
        {activeTab === 'reassignEntities' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Reassign / Deactivate Entities</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entity Type
              </label>
              <select
                value={entityType}
                onChange={handleEntityTypeChange}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="client">Client</option>
                <option value="anchor">Anchor</option>
                <option value="lender">Lender</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Entity
              </label>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an entity</option>
                {entities.map(entity => (
                  <option key={entity.id} value={entity.id}>
                    {entity.name} {entity.parent ? `(${entity.parent})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            {entityType !== 'lender' && (
              <form onSubmit={handleReassign} className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Reassign Entity</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reassign to {entityType === 'client' ? 'Anchor' : 'Lender'}
                  </label>
                  <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!selectedEntity}
                  >
                    <option value="">Select target</option>
                    {reassignmentTargets.map(target => (
                      <option key={target.id} value={target.id}>
                        {target.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedEntity || !selectedTarget}
                >
                  Reassign
                </button>
              </form>
            )}
            
            <form onSubmit={handleDeactivate}>
              <h3 className="text-lg font-medium mb-3 text-gray-700">Deactivate Entity</h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Deactivating an entity will prevent it from participating in any financing activities.
                  This action can be reversed later.
                </p>
              </div>
              
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedEntity}
              >
                Deactivate {selectedEntity ? entities.find(e => e.id.toString() === selectedEntity.toString())?.name : 'Entity'}
              </button>
            </form>
          </div>
        )}
        
        {/* Audit Logs Tab */}
        {activeTab === 'auditLogs' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Audit Logs</h2>
            
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3 text-gray-700">Filter Logs</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entity Type
                  </label>
                  <select
                    name="entityType"
                    value={logFilters.entityType}
                    onChange={handleLogFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="program">Program</option>
                    <option value="anchor">Anchor</option>
                    <option value="client">Client</option>
                    <option value="lender">Lender</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={logFilters.startDate}
                    onChange={handleLogFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={logFilters.endDate}
                    onChange={handleLogFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex">
                <button
                  type="button"
                  onClick={applyLogFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={resetLogFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No logs found matching the current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map(log => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.entity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {log.entityType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminControls;