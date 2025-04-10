import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  FaBell,
  FaShieldAlt,
  FaWallet,
  FaUserCog,
  FaPalette,
  FaCheckCircle,
  FaSave,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
  const { currentUser } = useOutletContext();
  const { updateProfile } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Settings state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get('tab');
    return tabParam && ['account', 'notifications', 'appearance', 'wallet', 'privacy'].includes(tabParam) 
      ? tabParam 
      : 'account';
  });

  // Form state
  const [settings, setSettings] = useState({
    // Account settings
    displayName: currentUser?.displayName || '',
    emailNotifications: true,
    twoFactorAuth: false,

    // Notification settings
    productNotifications: true,
    transactionNotifications: true,
    securityAlerts: true,
    marketingEmails: false,

    // Appearance settings
    theme: 'system',
    compactView: false,
    highContrast: false,

    // Wallet settings
    autoConnect: true,
    showBalance: false,
    defaultNetwork: 'ethereum',

    // Privacy settings
    shareAnalytics: true,
    shareInventory: false,
    publicProfile: true
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle settings save
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store settings in localStorage so they persist between sessions
      localStorage.setItem('userSettings', JSON.stringify(settings));

      // Here you would normally send settings to backend API
      // await updateUserSettings(settings);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle component for boolean settings
  const ToggleSwitch = ({ label, name, value, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-cta/10">
      <span className="text-text/90">{label}</span>
      <button
        type="button"
        className="relative"
        onClick={() => onChange({
          target: {
            name,
            type: 'checkbox',
            checked: !value
          }
        })}
      >
        {value ? (
          <FaToggleOn className="text-2xl text-cta" />
        ) : (
          <FaToggleOff className="text-2xl text-text/50" />
        )}
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Dashboard Settings</h1>
        <p className="text-text/60">Customize your dashboard experience and preferences</p>
      </div>

      {/* Settings content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-4 sticky top-24">
            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'account'
                    ? 'bg-cta/10 text-cta font-medium'
                    : 'hover:bg-background/40 text-text/70'
                  }`}
              >
                <FaUserCog className="mr-3" /> Account
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'notifications'
                    ? 'bg-cta/10 text-cta font-medium'
                    : 'hover:bg-background/40 text-text/70'
                  }`}
              >
                <FaBell className="mr-3" /> Notifications
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'appearance'
                    ? 'bg-cta/10 text-cta font-medium'
                    : 'hover:bg-background/40 text-text/70'
                  }`}
              >
                <FaPalette className="mr-3" /> Appearance
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'wallet'
                    ? 'bg-cta/10 text-cta font-medium'
                    : 'hover:bg-background/40 text-text/70'
                  }`}
              >
                <FaWallet className="mr-3" /> Wallet
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === 'privacy'
                    ? 'bg-cta/10 text-cta font-medium'
                    : 'hover:bg-background/40 text-text/70'
                  }`}
              >
                <FaShieldAlt className="mr-3" /> Privacy
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Settings form */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSave}>
            <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6 md:p-8 shadow-sm">
              {/* Success message */}
              {saveSuccess && (
                <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-500 px-4 py-3 rounded-lg flex items-center">
                  <FaCheckCircle className="mr-2" /> Your settings have been saved successfully.
                </div>
              )}

              {/* Account Settings */}
              {activeTab === 'account' && (
                <>
                  <h2 className="text-xl font-display font-bold text-cta mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-text/90 mb-1 text-sm">Display Name</label>
                      <input
                        type="text"
                        name="displayName"
                        value={settings.displayName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background/60 border border-cta/20 
                                  rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-text/90 mb-1 text-sm">Email</label>
                      <input
                        type="email"
                        disabled
                        value={currentUser?.email || ''}
                        className="w-full px-4 py-2 bg-background/60 border border-cta/20 
                                  rounded-lg opacity-70 cursor-not-allowed"
                      />
                      <p className="mt-1 text-xs text-text/50">Contact support to change your email address</p>
                    </div>

                    <ToggleSwitch
                      label="Email Notifications"
                      name="emailNotifications"
                      value={settings.emailNotifications}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Two-factor Authentication"
                      name="twoFactorAuth"
                      value={settings.twoFactorAuth}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <>
                  <h2 className="text-xl font-display font-bold text-cta mb-6">Notification Preferences</h2>

                  <div className="space-y-2">
                    <ToggleSwitch
                      label="Product Updates & Alerts"
                      name="productNotifications"
                      value={settings.productNotifications}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Transaction Notifications"
                      name="transactionNotifications"
                      value={settings.transactionNotifications}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Security Alerts"
                      name="securityAlerts"
                      value={settings.securityAlerts}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Marketing Emails"
                      name="marketingEmails"
                      value={settings.marketingEmails}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <>
                  <h2 className="text-xl font-display font-bold text-cta mb-6">Appearance Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-text/90 mb-1 text-sm">Theme</label>
                      <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background/60 border border-cta/20 
                                  rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
                      >
                        <option value="system">System Default</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    <ToggleSwitch
                      label="Compact View"
                      name="compactView"
                      value={settings.compactView}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="High Contrast Mode"
                      name="highContrast"
                      value={settings.highContrast}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Wallet Settings */}
              {activeTab === 'wallet' && (
                <>
                  <h2 className="text-xl font-display font-bold text-cta mb-6">Wallet Configuration</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-text/90 mb-1 text-sm">Connected Wallet</label>
                      <div className="w-full px-4 py-2 bg-background/60 border border-cta/20 rounded-lg flex justify-between items-center">
                        <span className="text-text/70">
                          {currentUser?.profile?.walletAddress ?
                            `${currentUser.profile.walletAddress.slice(0, 6)}...${currentUser.profile.walletAddress.slice(-4)}` :
                            'No wallet connected'}
                        </span>
                        <button
                          type="button"
                          className="text-sm text-cta hover:text-cta/80"
                          onClick={() => window.location.href = '/wallet-connection'}
                        >
                          {currentUser?.profile?.walletAddress ? 'Change' : 'Connect'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-text/90 mb-1 text-sm">Default Network</label>
                      <select
                        name="defaultNetwork"
                        value={settings.defaultNetwork}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-background/60 border border-cta/20 
                                  rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30 transition-all duration-200"
                      >
                        <option value="ethereum">Ethereum Mainnet</option>
                        <option value="polygon">Polygon</option>
                        <option value="bsc">Binance Smart Chain</option>
                        <option value="arbitrum">Arbitrum</option>
                        <option value="optimism">Optimism</option>
                      </select>
                    </div>

                    <ToggleSwitch
                      label="Auto-connect Wallet"
                      name="autoConnect"
                      value={settings.autoConnect}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Show Wallet Balance"
                      name="showBalance"
                      value={settings.showBalance}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <>
                  <h2 className="text-xl font-display font-bold text-cta mb-6">Privacy & Security</h2>

                  <div className="space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-3 rounded-lg text-sm mb-4">
                      Your data security is our priority. All settings here comply with our <a href="/policy" className="underline hover:text-blue-400">privacy policy</a>.
                    </div>

                    <ToggleSwitch
                      label="Share Anonymous Analytics"
                      name="shareAnalytics"
                      value={settings.shareAnalytics}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Public Inventory Profile"
                      name="publicProfile"
                      value={settings.publicProfile}
                      onChange={handleChange}
                    />

                    <ToggleSwitch
                      label="Share Inventory with Partners"
                      name="shareInventory"
                      value={settings.shareInventory}
                      onChange={handleChange}
                    />

                    <div className="pt-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                      >
                        Delete Account
                      </button>
                      <p className="mt-1 text-xs text-text/50">
                        This will permanently remove your account and all associated data.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Save button */}
              <div className="mt-8 pt-4 border-t border-cta/10 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-6 py-2 bg-cta hover:bg-cta/90 text-background font-medium rounded-lg 
                            flex items-center justify-center transition-colors
                            ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSaving ? (
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  Save Settings
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;