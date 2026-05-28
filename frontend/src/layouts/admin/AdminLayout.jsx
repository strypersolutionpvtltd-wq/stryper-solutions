import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  Search
} from 'lucide-react';

// ... (SidebarItem component remains the same) ...
const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }) => {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
        active 
          ? 'bg-brand-purple-600 text-white shadow-lg shadow-brand-purple-600/20' 
          : 'text-neutral-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className={active ? 'text-white' : 'group-hover:text-white'} />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden">{label}</span>
      )}
      {active && !collapsed && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shrink-0" />
      )}
    </div>
  );

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link to={path}>{content}</Link>;
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userData } = useAuth();

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Companies', icon: Building2, path: '/admin/companies' },
    { label: 'Consultants', icon: Briefcase, path: '/admin/consultants' },
    { label: 'Jobs', icon: Briefcase, path: '/admin/jobs' },
    { label: 'Applications', icon: FileText, path: '/admin/applications' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <>
      <ConfirmModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of the Admin Control Center? You will need to sign in again to access these features."
        confirmText="Log Out"
        isDanger={true}
      />
      <div 
        className="grid min-h-screen bg-[#0a0a0a] text-white transition-[grid-template-columns] duration-300 ease-in-out"
        style={{ 
          gridTemplateColumns: mobileOpen ? '1fr' : (collapsed ? '80px 1fr' : '256px 1fr'),
          scrollbarGutter: 'stable'
        }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {/* ── Sidebar (Fixed Position but Grid Aware) ── */}
        <aside 
          className={`hidden lg:flex flex-col bg-[#0f0f0f] border-r border-white/5 h-screen sticky top-0 overflow-hidden z-50`}
        >
          <div className="p-6 h-20 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-purple-600 flex items-center justify-center shrink-0">
              <span className="font-bold text-white">S</span>
            </div>
            {!collapsed && (
              <span className="font-display font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden">
                Stryper Admin
              </span>
            )}
          </div>

          <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto no-scrollbar">
            {NAV_ITEMS.map((item) => (
              <SidebarItem 
                key={item.path} 
                {...item} 
                active={location.pathname === item.path} 
                collapsed={collapsed}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-white/5 shrink-0">
            <SidebarItem 
              icon={LogOut} 
              label="Logout" 
              onClick={handleLogoutClick}
              collapsed={collapsed}
            />
          </div>
        </aside>

      {/* ── Mobile Sidebar (Drawer) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 z-[70] w-64 bg-[#0f0f0f] border-r border-white/5 flex flex-col lg:hidden"
            >
              <div className="p-6 h-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-purple-600 flex items-center justify-center shrink-0">
                  <span className="font-bold text-white">S</span>
                </div>
                <span className="font-display font-bold text-lg tracking-tight">Stryper Admin</span>
              </div>
              <nav className="flex-1 px-3 space-y-1 mt-4">
                {NAV_ITEMS.map((item) => (
                  <SidebarItem 
                    key={item.path} 
                    {...item} 
                    active={location.pathname === item.path} 
                    collapsed={false}
                  />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ── */}
      <div className="flex flex-col min-w-0 h-screen overflow-y-auto relative bg-[#0a0a0a]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 h-20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 text-neutral-400 transition-colors"
            >
              <Menu size={20} />
            </button>
            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-neutral-400"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-semibold text-white uppercase tracking-wider hidden sm:block">
              Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-neutral-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-600/50 w-64 text-white"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-white/5 text-neutral-400">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-[#0a0a0a]" />
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white uppercase">Super Admin</p>
                  <p className="text-[10px] text-neutral-500 uppercase font-medium tracking-tighter">Stryper Sol.</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple-600 to-brand-gold-500 flex items-center justify-center font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
