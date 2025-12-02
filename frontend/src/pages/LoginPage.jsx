import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from "../components/Input"
import { useAuthStore } from "../store/authStore"
import { useEffect } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoading, error, clearError } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  useEffect(() => {
  clearError();
}, [clearError]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
      
      {/* LEFT SIDE: Visual/Brand Area (Hidden on mobile) */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-lime-100 to-gray-900 
        relative items-center justify-center overflow-hidden"
      >
        {/* Decorative Circle Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-200 bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 bottom-0 right-0"></div>

        {/* Text Overlay */}
        <div className="relative z-10 p-12">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
                Welcome <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500">
                    Back
                </span>
            </h1>
            <p className=" text-lg max-w-md">
                Log in to access your dashboard and continue your journey.
            </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8 "
        >
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white mb-2">
                Log In
            </h2>
            <p className="text-gray-400">
                Welcome back to the community.
            </p>
          </div>

          <form noValidate onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-4">
                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    icon={Lock}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
                <Link to='/forgot-password' className='text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors'>
                    Forgot password?
                </Link>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                </div>
            )}

            {/* Submit Button */}
            <motion.button
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
              text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30
              hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 
              transition-all duration-200 flex justify-center items-center overflow-hidden"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={24} />
              ) : (
                <>
                  <span className="mr-2">Log In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="pt-6 text-center border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage