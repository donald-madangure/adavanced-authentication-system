import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ArrowRight, Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";



const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();

    // Use mock token for preview if params are empty
    const { token } = useParams(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token || "demo-token", password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden relative">
            <Toaster />
            
            {/* LEFT SIDE: Visual/Brand Area */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 bg-gradient-to-br from-lime-100 to-gray-900 
                relative items-center justify-center overflow-hidden"
            >
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full bg-blue-200 bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 bottom-0 right-0"></div>

                <div className="relative z-10 p-12">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Secure <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500">
                            Your Account
                        </span>
                    </h1>
                    <p className=" text-lg max-w-md">
                        Almost there. Create a new, strong password to regain access to your dashboard.
                    </p>
                </div>
            </motion.div>

            {/* RIGHT SIDE: Form Area */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
                
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-white mb-2">
                            Set New Password
                        </h2>
                        <p className="text-gray-400">
                            Please choose a password you haven't used before.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                                <p className="text-red-500 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Success Message (if handled via state instead of toast) */}
                        {message && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg">
                                <p className="text-blue500 text-sm font-medium">{message}</p>
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
                            text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/30
                            hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 
                            focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                            transition-all duration-200 flex justify-center items-center cursor-pointer"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <span className="mr-2">Reset Password</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};
export default ResetPasswordPage;