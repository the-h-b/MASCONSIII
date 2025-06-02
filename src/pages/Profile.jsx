import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@masconsiii.com',
    phone: '+91 9876543210',
    role: 'Super Admin',
    department: 'Administration',
    joinDate: '01/01/2025',
    lastLogin: '15/07/2025, 09:30 AM'
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...profileData});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    // In a real app, this would send data to an API
    setProfileData({...formData});
    setEditMode(false);
    customAlert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      customAlert('New passwords do not match!');
      return;
    }
    
    // In a real app, this would send data to an API
    customAlert('Password changed successfully!');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTwoFactorToggle = (e) => {
    e.preventDefault();
    
    // In a real app, this would verify the code and enable 2FA
    setTwoFactorEnabled(!twoFactorEnabled);
    setShowTwoFactorModal(false);
    setVerificationCode('');
    
    customAlert(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
  };

  const activityLog = [
    { id: 1, action: 'Logged in', timestamp: '15/07/2025, 09:30 AM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
    { id: 2, action: 'Updated client record', timestamp: '14/07/2025, 04:15 PM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
    { id: 3, action: 'Added new BIN', timestamp: '14/07/2025, 02:30 PM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
    { id: 4, action: 'Logged in', timestamp: '14/07/2025, 09:45 AM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
    { id: 5, action: 'Password changed', timestamp: '10/07/2025, 11:20 AM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
    { id: 6, action: 'Logged in', timestamp: '10/07/2025, 09:15 AM', ipAddress: '192.168.1.1', device: 'Chrome on Windows' },
  ];

  return (
    <AdminLayout title="Profile">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setFormData({...profileData});
                setEditMode(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                {editMode ? (
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                {editMode ? (
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                {editMode ? (
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <p className="text-gray-900">{profileData.role}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Department
                </label>
                <p className="text-gray-900">{profileData.department}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joinDate">
                  Join Date
                </label>
                <p className="text-gray-900">{profileData.joinDate}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastLogin">
                  Last Login
                </label>
                <p className="text-gray-900">{profileData.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">Password</h4>
                <p className="text-gray-600 text-sm mb-2">Last changed: 10/07/2025</p>
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change Password
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {twoFactorEnabled ? 'Enabled' : 'Not enabled'}
                </p>
                <button 
                  onClick={() => setShowTwoFactorModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {twoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">Sessions</h4>
                <p className="text-gray-600 text-sm mb-2">
                  You're currently logged in on 1 device
                </p>
                <button 
                  onClick={() => customAlert('All other sessions have been logged out!')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Log out of all other sessions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Activity Log</h3>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activityLog.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.ipAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Full Activity Log
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {twoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
            </h3>
            {!twoFactorEnabled ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-700 mb-4">
                    Scan this QR code with your authenticator app:
                  </p>
                  <div className="bg-gray-100 p-4 flex justify-center">
                    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600">QR Code Placeholder</span>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleTwoFactorToggle}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                      Verification Code
                    </label>
                    <input
                      id="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter 6-digit code"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTwoFactorModal(false);
                        setVerificationCode('');
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      Verify and Enable
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <form onSubmit={handleTwoFactorToggle}>
                <p className="text-gray-700 mb-4">
                  Are you sure you want to disable two-factor authentication? This will make your account less secure.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowTwoFactorModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Disable
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Profile;