// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
      
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
            Forgot <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500">
              Password?
            </span>
          </h1>
          <p className=" text-lg max-w-md">
            Don't worry, it happens. We'll help you recover your account in no time.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          
          {!isSubmitted ? (
            /* --- FORM STATE --- */
            <div className="space-y-8">
                <div className="text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
                        text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30
                        hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                        transition-all duration-200 flex justify-center items-center"
                        type="submit"
                    >
                        {isLoading ? (
                            <Loader className="size-6 animate-spin mx-auto" />
                        ) : (
                             <>
                                <span className="mr-2">Send Reset Link</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
          ) : (
            /* --- SUCCESS STATE --- */
            <div className="text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-20 h-20 bg-blue-500/10 border border-blue-500/50 rounded-full flex items-center justify-center mx-auto"
                >
                    <Mail className="h-10 w-10 text-blue-400" />
                </motion.div>
                
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Check your inbox</h2>
                    <p className="text-gray-400 mb-6">
                        If an account exists for <span className="text-blue-400 font-medium">{email}</span>, you will receive a password reset link shortly.
                    </p>
                </div>
            </div>
          )}

          {/* Footer / Back to Login */}
          <div className="pt-8 mt-4 flex justify-center border-t border-gray-800/50">
            <Link
              to={"/login"}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to Login
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;