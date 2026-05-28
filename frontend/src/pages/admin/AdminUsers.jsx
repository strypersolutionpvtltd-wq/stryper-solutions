import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, UserX, Mail, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ALL_USERS } from '@/data/adminData';
import toast from 'react-hot-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AdminUsers = () => {
  const [users, setUsers] = useState(ALL_USERS);
  const [searchTerm, setSearchText] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleDelete = (id, name) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success(`${name} has been removed.`);
    setActiveMenu(null);
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' || currentStatus === 'Verified' ? 'Inactive' : 'Active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`Status updated to ${newStatus}`);
    setActiveMenu(null);
  };

  const handleEmail = (email) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Preparing email composer...',
        success: `Email draft sent to ${email}`,
        error: 'Failed to open composer',
      }
    );
    setActiveMenu(null);
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="space-y-6 pb-10"
      onClick={() => setActiveMenu(null)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">User Management</h2>
          <p className="text-neutral-500 text-sm mt-1">Manage all {users.length} candidates and companies.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-neutral-500" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-600/50 w-full sm:w-64 text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium hover:bg-white/10 transition-colors text-white">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <motion.div 
        variants={fadeInUp}
        className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto text-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={user.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-purple-600/10 flex items-center justify-center text-brand-purple-500 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.name}</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${user.role === 'Company' ? 'bg-orange-500/10 text-orange-500' : 'bg-brand-purple-500/10 text-brand-purple-500'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusToggle(user.id, user.status); }}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' || user.status === 'Verified' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-xs text-neutral-400 font-medium">{user.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-neutral-500 font-medium">{user.joined}</span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEmail(user.email); }}
                          title="Email User" 
                          className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Mail size={16} />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === user.id ? null : user.id); }}
                            className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {activeMenu === user.id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
                              <button 
                                onClick={() => handleStatusToggle(user.id, user.status)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-300 hover:bg-white/5 transition-colors"
                              >
                                <ShieldCheck size={14} />
                                {user.status === 'Active' || user.status === 'Verified' ? 'Deactivate Account' : 'Activate Account'}
                              </button>
                              <button 
                                onClick={() => handleDelete(user.id, user.name)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                              >
                                <Trash2 size={14} />
                                Delete User
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-neutral-500 text-sm">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminUsers;
