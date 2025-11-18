// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Input from '../components/Input'
import{ User, Mail, Lock, Loader} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import {useAuthStore} from '../store/authStore'
import { useNavigate } from 'react-router-dom'


const SignUpPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { signup, error, isLoading } = useAuthStore()

  const handleSignUp = async (e) => {
  e.preventDefault()
  // Handle sign-up logic here
  try {
    await signup(email, password, name)
    navigate('/verify-email')
  } catch (error) {
    console.log('Sign-up error:', error)    
  }
}


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1}}
      className='max-w-xl w-full bg-gray-700 bg-opacity-50 backdrop-blur-xl 
      rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r
         from-lime-500 to-lime-500 text-transparent bg-clip-text'>
          Create Account          
        </h2>
        <form onSubmit={handleSignUp}> 

          <Input 
            icon={User}
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}          
          />  

          <Input 
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}           
          /> 

          <Input 
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}           
          /> 

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          {/* password strength meter */}
          <PasswordStrengthMeter password={password} />

          <motion.button
          className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-lime-500 to-lime-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-lime-600
						hover:to-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200 text-center cursor-pointer'
            whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : 'Sign Up'}
          </motion.button>
                             
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-lime-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
    </motion.div>
  )
}

export default SignUpPage