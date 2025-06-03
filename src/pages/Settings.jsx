import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { customAlert } from '../utils/auth';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Masccons Financial Services',
    supportEmail: 'support@masconsiii.com',
    supportPhone: '+91 1800-123-4567',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12-hour'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    appNotifications: true,
    fraudAlerts: true,
    systemUpdates: true,
    marketingCommunications: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    ipRestriction: false,
    allowedIPs: '',
    twoFactorAuth: 'optional'
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_51NXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    webhookUrl: 'https://api.masconsiii.com/webhooks',
    ipWhitelist: '192.168.1.1, 192.168.1.2',
    rateLimit: '100'
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleNotificationSettingsChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleApiSettingsChange = (e) => {
    const { name, value } = e.target;
    setApiSettings({
      ...apiSettings,
      [name]: value
    });
  };

  const handleSaveSettings = (settingType) => {
    // In a real app, this would send data to an API
    customAlert(`${settingType} settings saved successfully!`);
  };

  const regenerateApiKey = () => {
    // In a real app, this would generate a new API key
    const newApiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiSettings({
      ...apiSettings,
      apiKey: newApiKey
    });
    customAlert('API key regenerated successfully!');
  };

  return (
    <AdminLayout title="Settings">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'security' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'api' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('api')}
          >
            API
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={generalSettings.companyName}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supportEmail">
                    Support Email
                  </label>
                  <input
                    id="supportEmail"
                    name="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supportPhone">
                    Support Phone
                  </label>
                  <input
                    id="supportPhone"
                    name="supportPhone"
                    type="text"
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timezone">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                    <option value="America/New_York">America/New_York (GMT-4:00)</option>
                    <option value="Europe/London">Europe/London (GMT+1:00)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9:00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFormat">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeFormat">
                    Time Format
                  </label>
                  <select
                    id="timeFormat"
                    name="timeFormat"
                    value={generalSettings.timeFormat}
                    onChange={handleGeneralSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="12-hour">12-hour (AM/PM)</option>
                    <option value="24-hour">24-hour</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('General')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="emailAlerts"
                    name="emailAlerts"
                    type="checkbox"
                    checked={notificationSettings.emailAlerts}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailAlerts" className="ml-2 block text-sm text-gray-900">
                    Email Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="smsAlerts"
                    name="smsAlerts"
                    type="checkbox"
                    checked={notificationSettings.smsAlerts}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="smsAlerts" className="ml-2 block text-sm text-gray-900">
                    SMS Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="appNotifications"
                    name="appNotifications"
                    type="checkbox"
                    checked={notificationSettings.appNotifications}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="appNotifications" className="ml-2 block text-sm text-gray-900">
                    In-App Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="fraudAlerts"
                    name="fraudAlerts"
                    type="checkbox"
                    checked={notificationSettings.fraudAlerts}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="fraudAlerts" className="ml-2 block text-sm text-gray-900">
                    Fraud Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="systemUpdates"
                    name="systemUpdates"
                    type="checkbox"
                    checked={notificationSettings.systemUpdates}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-900">
                    System Updates
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="marketingCommunications"
                    name="marketingCommunications"
                    type="checkbox"
                    checked={notificationSettings.marketingCommunications}
                    onChange={handleNotificationSettingsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="marketingCommunications" className="ml-2 block text-sm text-gray-900">
                    Marketing Communications
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('Notification')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </label>
                  <input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecuritySettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordExpiry">
                    Password Expiry (days)
                  </label>
                  <input
                    id="passwordExpiry"
                    name="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecuritySettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginAttempts">
                    Max Login Attempts
                  </label>
                  <input
                    id="loginAttempts"
                    name="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecuritySettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twoFactorAuth">
                    Two-Factor Authentication
                  </label>
                  <select
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    value={securitySettings.twoFactorAuth}
                    onChange={handleSecuritySettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="disabled">Disabled</option>
                    <option value="optional">Optional</option>
                    <option value="required">Required</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <input
                      id="ipRestriction"
                      name="ipRestriction"
                      type="checkbox"
                      checked={securitySettings.ipRestriction}
                      onChange={handleSecuritySettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="ipRestriction" className="ml-2 block text-sm font-bold text-gray-900">
                      Enable IP Restriction
                    </label>
                  </div>
                  {securitySettings.ipRestriction && (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allowedIPs">
                        Allowed IP Addresses (comma separated)
                      </label>
                      <input
                        id="allowedIPs"
                        name="allowedIPs"
                        type="text"
                        value={securitySettings.allowedIPs}
                        onChange={handleSecuritySettingsChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="e.g. 192.168.1.1, 10.0.0.1"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('Security')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* API Settings */}
          {activeTab === 'api' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">API Settings</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
                    API Key
                  </label>
                  <div className="flex">
                    <input
                      id="apiKey"
                      name="apiKey"
                      type="text"
                      value={apiSettings.apiKey}
                      readOnly
                      className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    />
                    <button
                      onClick={regenerateApiKey}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-200"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="webhookUrl">
                    Webhook URL
                  </label>
                  <input
                    id="webhookUrl"
                    name="webhookUrl"
                    type="text"
                    value={apiSettings.webhookUrl}
                    onChange={handleApiSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ipWhitelist">
                    IP Whitelist (comma separated)
                  </label>
                  <input
                    id="ipWhitelist"
                    name="ipWhitelist"
                    type="text"
                    value={apiSettings.ipWhitelist}
                    onChange={handleApiSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g. 192.168.1.1, 10.0.0.1"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rateLimit">
                    Rate Limit (requests per minute)
                  </label>
                  <input
                    id="rateLimit"
                    name="rateLimit"
                    type="number"
                    value={apiSettings.rateLimit}
                    onChange={handleApiSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('API')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;