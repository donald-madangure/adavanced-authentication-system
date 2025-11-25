// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { formatDate } from "../utils/date";
import { LogOut, User, Mail, Activity, Calendar, Clock, ShieldCheck } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  // Animation Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      variants={containerVariants}
      className="max-w-4xl w-full mx-auto mt-10 p-8 bg-gray-900/60 backdrop-blur-2xl 
      rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-gray-800/50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-gray-800/50 rounded-2xl mb-4 border border-gray-700/50 shadow-inner">
           <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{user.name}</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm font-medium uppercase tracking-widest">Secure Dashboard Access</p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-gray-800/40 rounded-2xl border border-gray-700/30 hover:border-blue-500/30 transition-colors group"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Profile Details</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Name</p>
                <p className="text-gray-200 font-medium">{user.name}</p>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/30 flex items-center gap-4 overflow-hidden">
              <Mail className="w-5 h-5 text-gray-500" />
              <div className="truncate">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-gray-200 font-medium truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Card */}
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-gray-800/40 rounded-2xl border border-gray-700/30 hover:border-purple-500/30 transition-colors group"
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">System Activity</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors border-b border-gray-700/50 pb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Member Since</span>
              </div>
              <span className="text-gray-200 font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">Last Login</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-gray-200 font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                  {formatDate(user.lastLogin)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logout Action */}
      <motion.div variants={itemVariants} className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="group relative w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500/10 to-red-600/10 
          border border-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/20 hover:text-red-300 
          transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>Sign Out of Session</span>
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default DashboardPage;