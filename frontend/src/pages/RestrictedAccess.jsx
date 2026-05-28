import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestrictedAccess = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <ShieldAlert size={40} className="text-red-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Restricted Area</h2>
        <p className="text-neutral-500 text-sm leading-relaxed mb-10">
          Access Denied. You do not have the required administrative privileges to view this page. 
          Unauthorized access attempts are logged.
        </p>

        <div className="space-y-4">
          <Link to="/" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 pt-4 text-[10px] text-neutral-600 uppercase font-bold tracking-[0.2em]">
            <Lock size={10} />
            Secured by Stryper Auth
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestrictedAccess;
