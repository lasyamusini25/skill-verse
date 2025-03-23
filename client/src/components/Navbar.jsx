import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Briefcase, Sparkles, UserCircle } from 'lucide-react';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const { setShowRecruiterLogin } = useContext(AppContext);

    return (
        <div className='shadow-md py-4 bg-blue-100'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                
                {/* Logo with Sparkles */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img className="w-10" src={assets.logo} alt="SkillVerse" />
                    <Sparkles size={24} className="text-blue-600" />
                </div>

                {
                    user ? (
                        <div className='flex items-center gap-4 text-blue-900 font-medium'>
                            <Link to={'/applications'} className="flex items-center gap-2 hover:text-blue-600 transition">
                                <Briefcase size={20} /> My Gigs
                            </Link>
                            <p>|</p>
                            <div className='flex items-center gap-2'>
                                <UserCircle size={24} />
                                <p className='max-sm:hidden'>{user.firstName + " " + user.lastName}</p>
                                <UserButton />
                            </div>
                        </div>
                    ) : (
                        <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-700 hover:text-blue-600 transition'>
                                Recruiter Login
                            </button>
                            <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full shadow-lg hover:bg-blue-500 transition'>
                                Login 🚀
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Navbar;
