import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
           const userCredentials = await signInWithEmailAndPassword( auth, email, password);
            await userCredentials.user.reload();
            if (!userCredentials.user.emailVerified) {
                await signOut(auth);
                toast.error("Please verify your email before logging in.");
                setLoading(false);
                return;
            }
            await axios.post("http://localhost:5000/api/users", { firebase_uid: userCredentials.user.uid, email: userCredentials.user.email })

            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (

        <motion.div initial={ { opacity: 0, y: 30 } } animate={ { opacity: 1, y: 0 } } transition={ { duration: 0.5 } } className="max-w-md mx-auto p-6 mt-20 dark:bg-[#1E293B] rounded-lg shadow-md bg-transparent">

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold dark:text-white cursor-pointer shadow-lg " >
                    The<span className="text-blue-700 dark:text-white-100 ml-1">Akhbaar</span>
                </h1>
                <p className="text-slate-400 mt-2">
                    Sign in to continue
                </p>
            </div>

            <form onSubmit={ handleLogin } className="space-y-4">
                <input type="email" placeholder="Email" value={ email } onChange={ (e) => setEmail(e.target.value) } className="w-full px-4 py-3 rounded-lg  border border-slate-800 text-gray-800 placeholder-slate-500 outline-none focus:border-blue-500 transition" />

                <input type="password" placeholder="Password" value={ password } onChange={ (e) => setPassword(e.target.value) } className="w-full px-4 py-3 rounded-lg  border border-slate-800 text-gray-800 placeholder-slate-500 outline-none focus:border-blue-500 transition" />

                { error && (

                    <p className="text-red-500">

                        { error }

                    </p>

                ) }

                <motion.button whileHover={ { scale: 1.02 } } whileTap={ { scale: 0.98 } } type="submit" disabled={ loading } className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full"
                >
                    { loading ? "Logging In..." : "Login" }

                </motion.button>

            </form>

        </motion.div>

    );

}
export default Login;

