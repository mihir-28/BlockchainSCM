import React, { useState, useEffect } from 'react';
import { FaUserShield, FaSpinner, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  const roles = [
    { id: 'CONSUMER_ROLE', label: 'Consumer' },
    { id: 'RETAILER_ROLE', label: 'Retailer' },
    { id: 'DISTRIBUTOR_ROLE', label: 'Distributor' },
    { id: 'MANUFACTURER_ROLE', label: 'Manufacturer' },
    { id: 'ADMIN_ROLE', label: 'Admin' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        role: newRole
      });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? {...user, role: newRole} : user
      ));
      
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser({
      ...user,
      newRole: user.role
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser || editingUser.newRole === editingUser.role) {
      setEditingUser(null);
      return;
    }
    
    await updateUserRole(editingUser.id, editingUser.newRole);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(user => 
    // First filter out admin users (don't show admins in the list)
    user.role !== 'ADMIN_ROLE' &&
    // Then apply search filters
    (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.company?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper function to get role label
  const getRoleLabel = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.label : roleId;
  };

  return (
    <div className="bg-panel/20 backdrop-blur-sm rounded-xl border border-cta/20 p-6">
      <h2 className="text-xl font-bold text-text mb-6 flex items-center">
        <FaUserShield className="mr-2 text-cta" /> Role Management
      </h2>
      
      {/* Search input */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-text/50" />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email or company..."
          className="w-full pl-10 pr-4 py-2 bg-background/60 border border-cta/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cta/30"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Users table */}
      <div className="overflow-hidden rounded-lg border border-cta/20">
        <table className="min-w-full divide-y divide-cta/20">
          <thead className="bg-background/40">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-background/20 divide-y divide-cta/10">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <FaSpinner className="animate-spin inline mr-2" /> Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-text/50">
                  No users found. Try adjusting your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-background/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full mr-3" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-cta/20 flex items-center justify-center mr-3">
                          <span className="text-cta text-sm">{user.displayName?.charAt(0) || user.email?.charAt(0) || '?'}</span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-text">{user.displayName || 'No name'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text">{user.company || 'Not specified'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUser && editingUser.id === user.id ? (
                      <select
                        value={editingUser.newRole || ''}
                        onChange={e => setEditingUser({...editingUser, newRole: e.target.value})}
                        className="bg-background border border-cta/30 text-text rounded px-2 py-1 text-sm"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN_ROLE' ? 'bg-purple-900/80 text-purple-200' :
                        user.role === 'MANUFACTURER_ROLE' ? 'bg-blue-900/80 text-blue-200' :
                        user.role === 'DISTRIBUTOR_ROLE' ? 'bg-green-900/80 text-green-200' :
                        user.role === 'RETAILER_ROLE' ? 'bg-amber-900/80 text-amber-200' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {getRoleLabel(user.role)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingUser && editingUser.id === user.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-500 hover:text-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-500 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-cta hover:text-cta/80"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;