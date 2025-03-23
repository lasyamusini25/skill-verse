import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Upload, User, Mail, Lock, X } from 'lucide-react';

const RecruiterLogin = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(false);
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (state === "Sign Up" && !isTextDataSubmited) return setIsTextDataSubmited(true);
        try {
            if (state === "Login") {
                const { data } = await axios.post(`${backendUrl}/api/company/login`, { email, password });
                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('password', password);
                formData.append('email', email);
                formData.append('image', image);
                const { data } = await axios.post(`${backendUrl}/api/company/register`, formData);
                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-lg bg-blue-900/50 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-8 rounded-2xl text-blue-700 shadow-xl w-96'>
                <h1 className='text-center text-2xl font-bold text-blue-800'>{state === "Login" ? 'Recruiter Login' : 'Sign Up for Gigs'}</h1>
                <p className='text-center text-sm mt-1'>Find skilled students for your next gig! 🚀</p>
                {state === "Sign Up" && isTextDataSubmited ? (
                    <div className='flex flex-col items-center my-6'>
                        <label htmlFor="image" className='cursor-pointer flex flex-col items-center'>
                            <img className='w-20 h-20 rounded-full object-cover border-2 border-blue-500' src={image ? URL.createObjectURL(image) : ''} alt="Upload logo" />
                            <Upload className='text-blue-600 mt-2' size={24} />
                            <p className='text-xs text-gray-600'>Upload Company Logo</p>
                            <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                        </label>
                    </div>
                ) : (
                    <>
                        {state !== 'Login' && (
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                                <User className='text-blue-600' size={20} />
                                <input className='outline-none text-sm w-full bg-transparent' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                            </div>
                        )}
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                            <Mail className='text-blue-600' size={20} />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-lg mt-4 bg-blue-50'>
                            <Lock className='text-blue-600' size={20} />
                            <input className='outline-none text-sm w-full bg-transparent' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                        </div>
                    </>
                )}
                {state === "Login" && <p className='text-sm text-blue-600 mt-3 text-right cursor-pointer'>Forgot password?</p>}
                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition'>{state === 'Login' ? 'Login' : isTextDataSubmited ? 'Create Account' : 'Next'}</button>
                <p className='mt-4 text-center'>
                    {state === 'Login' ? "Don't have an account? " : "Already have an account? "}
                    <span className='text-blue-600 cursor-pointer' onClick={() => setState(state === 'Login' ? "Sign Up" : "Login")}>
                        {state === 'Login' ? "Sign Up" : "Login"}
                    </span>
                </p>
                <X onClick={() => setShowRecruiterLogin(false)} className='absolute top-4 right-4 text-blue-700 cursor-pointer' size={24} />
            </form>
        </div>
    );
};

export default RecruiterLogin;