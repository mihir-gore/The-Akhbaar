import { useState } from 'react';
import axios from "axios";
import { createUserWithEmailAndPassword, sendEmailVerification,signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredentials.user);
      await signOut(auth);  
      toast.success("Verification email sent! Please verify your email before logging in. Please Check Spam! also.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (

    <div className="max-w-md mx-auto p-6 mt-20 dark:bg-[#1E293B] rounded-lg shadow-md">

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold dark:text-white cursor-pointer shadow-lg " >
          The<span className="text-blue-700 dark:text-white-100 ml-1">Akhbaar</span>
        </h1>
        <p className="text-slate-400 mt-2">
          Sign Up to continue
        </p>
      </div>
      <form onSubmit={ handleSignup } className="space-y-4" >

        <input type="email" placeholder="Email" value={ email } onChange={ (e) => setEmail(e.target.value) } className="w-full px-4 py-3 rounded-lg  border border-slate-800 text-gray-800 placeholder-slate-500 outline-none focus:border-blue-500 transition" />

        <input type="password" placeholder="Password" value={ password } onChange={ (e) => setPassword(e.target.value) } className="w-full px-4 py-3 rounded-lg  border border-slate-800 text-gray-800 placeholder-slate-500 outline-none focus:border-blue-500 transition" />

        { error && (

          <p className="text-red-500">

            { error }

          </p>

        ) }

        <motion.button whileHover={ { scale: 1.02 } } whileTap={ { scale: 0.98 } } type="submit" disabled={ loading } className="bg-blue-600 text-white px-4 py-3 rounded w-full">

          { loading ? "Creating..." : "Create Account" }

        </motion.button>

      </form>

    </div>

  );

}
export default Signup;