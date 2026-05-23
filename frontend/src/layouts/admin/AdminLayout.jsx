import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  X,
  Search,
  ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, collapsed }) => (
  <Link to={path}>
    <motion.div
      whileHover={{ x: 4 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-brand-purple-600 text-white shadow-lg shadow-brand-purple-600/20' 
          : 'text-neutral-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className={active ? 'text-white' : 'group-hover:text-white'} />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      )}
      {active && !collapsed && (
        <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
      )}
    </motion.div>
  </Link>
);

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Companies', icon: Building2, path: '/admin/companies' },
    { label: 'Jobs', icon: Briefcase, path: '/admin/jobs' },
    { label: 'Applications', icon: FileText, path: '/admin/applications' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Sidebar ── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#0f0f0f] border-r border-white/5 transition-all duration-300 flex flex-col
                   ${collapsed ? 'w-20' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-purple-600 flex items-center justify-center shrink-0">
            <span className="font-bold text-white">S</span>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg tracking-tight">Stryper Admin</span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <SidebarItem 
              key={item.path} 
              {...item} 
              active={location.pathname === item.path} 
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem 
            icon={LogOut} 
            label="Logout" 
            path="/" 
            collapsed={collapsed}
          />
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 text-neutral-400"
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
                placeholder="Search analytics..." 
                className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple-600/50 w-64"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-xl hover:bg-white/5 text-neutral-400">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-[#0a0a0a]" />
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white">Super Admin</p>
                  <p className="text-[10px] text-neutral-500 uppercase font-medium">Stryper Sol.</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple-600 to-brand-gold-500 flex items-center justify-center font-bold text-sm">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
