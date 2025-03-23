import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Upload, User, Mail, Lock, X } from 'lucide-react';

const RecruiterLogin = ({ setShowRecruiterLogin }) => {
    const navigate = useNavigate();
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const { backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting login/signup request...");
            console.log("Backend URL:", backendUrl);

            if (state === "Login") {
                const { data } = await axios.post(`${backendUrl}/api/company/login`, {
                    email,
                    password,
                    namespace: "job-portal.companies"
                });
                
                console.log("Login Response:", data);
    
                if (data.success) {
                    handleSuccess(data);
                } else {
                    toast.error(data.message);
                }
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('password', password);
                formData.append('email', email);
                if (image) formData.append('image', image);
    
                const { data } = await axios.post(`${backendUrl}/api/company/register`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log("Signup Response:", data);
    
                if (data.success) {
                    handleSuccess(data);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    

    const handleSuccess = (data) => {
        setCompanyData(data.company);
        setCompanyToken(data.token);
        localStorage.setItem('companyToken', data.token);
        setShowRecruiterLogin(false);
        navigate('/dashboard/manage-jobs');
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div 
            className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50' 
            onClick={() => setShowRecruiterLogin(false)}
        >
            <form 
                onClick={(e) => e.stopPropagation()} 
                onSubmit={handleSubmit} 
                className='relative bg-white p-8 rounded-2xl text-blue-700 shadow-xl w-96'
            >
                <h1 className='text-center text-2xl font-bold text-blue-800'>
                    {state === "Login" ? 'Recruiter Login' : 'Sign Up for Gigs'}
                </h1>
                <p className='text-center text-sm mt-1'>Find skilled students for your next gig! 🚀</p>

                {state !== 'Login' && (
                    <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                        <User className='text-blue-600' size={20} />
                        <input 
                            className='outline-none text-sm w-full bg-transparent' 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                            type="text" 
                            placeholder='Company Name' 
                            required 
                        />
                    </div>
                )}
                <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                    <Mail className='text-blue-600' size={20} />
                    <input 
                        className='outline-none text-sm w-full bg-transparent' 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        type="email" 
                        placeholder='Email Id' 
                        required 
                    />
                </div>
                <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                    <Lock className='text-blue-600' size={20} />
                    <input 
                        className='outline-none text-sm w-full bg-transparent' 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                    
                </div>
                {state !== 'Login' && (
    <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
        <Upload className='text-blue-600' size={20} />
        <input 
            type="file" 
            accept="image/*"
            className="outline-none text-sm w-full bg-transparent" 
            onChange={(e) => setImage(e.target.files[0])} 
        />
    </div>
)}


                <button 
                    type="submit" 
                    className='w-full bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-500 transition mt-6'
                >
                    {state}
                </button>

                <p className='text-center text-sm mt-4'>
                    {state === "Login" ? "New recruiter?" : "Already have an account?"} 
                    <span 
                        className='text-blue-600 font-semibold cursor-pointer' 
                        onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
                    > {state === "Login" ? "Sign Up" : "Login"}</span>
                </p>

                <X 
                    onClick={() => setShowRecruiterLogin(false)} 
                    className='absolute top-4 right-4 text-blue-700 cursor-pointer' 
                    size={24} 
                />
            </form>
        </div>
    );
};

export default RecruiterLogin;
