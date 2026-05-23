import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Users, Building2, Briefcase, FileText, 
  TrendingUp, TrendingDown, ArrowUpRight, Clock,
  MoreVertical, Filter, Download
} from 'lucide-react';
import { 
  OVERVIEW_STATS, 
  USER_GROWTH_DATA, 
  JOB_ANALYTICS_DATA, 
  RECENT_ACTIVITY, 
  LATEST_USERS 
} from '@/data/adminData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const COLORS = ['#8B3A8F', '#F5A623', '#10b981', '#ef4444'];

const AdminDashboard = () => {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="space-y-8 pb-10"
    >
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Platform Overview</h2>
          <p className="text-neutral-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple-600 text-white text-sm font-semibold hover:bg-brand-purple-700 transition-all shadow-lg shadow-brand-purple-600/20">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {OVERVIEW_STATS.map((stat, i) => (
          <motion.div 
            key={stat.label}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.type === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.type === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.type === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Chart */}
        <motion.div 
          variants={fadeInUp}
          className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-white">Registration Growth</h3>
            <select className="bg-white/5 border border-white/5 text-xs rounded-lg px-2 py-1 outline-none text-neutral-400">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={USER_GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorCand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B3A8F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B3A8F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="candidates" stroke="#8B3A8F" strokeWidth={3} fillOpacity={1} fill="url(#colorCand)" />
                <Area type="monotone" dataKey="companies" stroke="#F5A623" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Job Distribution Pie */}
        <motion.div 
          variants={fadeInUp}
          className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6"
        >
          <h3 className="font-bold text-lg text-white mb-8">Job Analytics</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={JOB_ANALYTICS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {JOB_ANALYTICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-neutral-500 text-center uppercase tracking-widest">Efficiency Rate</span>
              <span className="text-emerald-500">+14.2%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <motion.div 
          variants={fadeInUp}
          className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden"
        >
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <h3 className="font-bold text-white">Latest Registrations</h3>
            <button className="text-brand-purple-400 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LATEST_USERS.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${user.role === 'Company' ? 'bg-orange-500/10 text-orange-500' : 'bg-purple-500/10 text-purple-500'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' || user.status === 'Verified' ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                        <span className="text-xs text-neutral-400 font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-neutral-500 font-medium">{user.joined}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          variants={fadeInUp}
          className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white">Live Activity</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">
              Live
            </span>
          </div>
          <div className="space-y-6">
            {RECENT_ACTIVITY.map((activity, idx) => (
              <div key={activity.id} className="flex gap-4 relative">
                {idx !== RECENT_ACTIVITY.length - 1 && (
                  <div className="absolute top-8 left-4 w-px h-10 bg-white/5" />
                )}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <Clock size={14} className="text-neutral-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">{activity.user}</p>
                    <span className="text-[10px] text-neutral-600 font-medium">{activity.time}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">{activity.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-xs font-bold text-neutral-400 hover:bg-white/5 transition-all">
            Load More Activity
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
