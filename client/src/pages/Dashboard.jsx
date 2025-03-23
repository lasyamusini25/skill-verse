import { useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Home, PlusCircle, Briefcase, LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    // Function to logout
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
    };

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-gigs');
        }
    }, [companyData]);

    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white'>
            {/* Navbar */}
            <div className='shadow-lg py-4 bg-blue-700'>
                <div className='px-5 flex justify-between items-center'>
                    <h1 
                        onClick={() => navigate('/')} 
                        className='text-2xl font-bold cursor-pointer tracking-wider'>SkillVerse 🚀</h1>
                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden text-lg'>Welcome, {companyData.name} ✨</p>
                            <div className='relative group'>
                                <User className='w-8 h-8 border rounded-full cursor-pointer' />
                                <div className='absolute hidden group-hover:block top-10 right-0 bg-white text-black rounded shadow-md p-2'>
                                    <ul>
                                        <li onClick={logout} className='flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md'>
                                            <LogOut className='w-5 h-5 text-red-500' /> Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex items-start'>
                {/* Sidebar */}
                <div className='inline-block min-h-screen bg-blue-800 shadow-lg w-64 p-4'>
                    <ul className='flex flex-col gap-4 text-lg'>
                        <NavLink 
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`} 
                            to={'/dashboard/add-gig'}>
                            <PlusCircle className='w-6 h-6' /> Add Gig 📌
                        </NavLink>
                        <NavLink 
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`} 
                            to={'/dashboard/manage-gigs'}>
                            <Home className='w-6 h-6' /> Manage Gigs 🏆
                        </NavLink>
                        <NavLink 
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`} 
                            to={'/dashboard/view-applications'}>
                            <Briefcase className='w-6 h-6' /> View Applications 🎯
                        </NavLink>
                    </ul>
                </div>

                {/* Content */}
                <div className='flex-1 h-full p-5 bg-white rounded-lg shadow-lg text-black'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;