import { useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, MapPin, Rocket, Sparkles, Briefcase } from 'lucide-react';

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);
    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
        setIsSearched(true);
    };

    return (
        <div className='relative container 2xl:px-20 mx-auto my-10 text-white'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-800 py-16 text-center mx-2 rounded-xl shadow-xl relative z-10'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2'>
                    <Rocket size={32} className='text-yellow-300 animate-bounce' /> 10,000+ Opportunities Await!
                </h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
                    Your Next Big Career Move Starts Here! 🚀 Explore Paid Gigs & Internships and Get Hired Fast!
                </p>
                <div className='flex items-center justify-between bg-white rounded-lg text-gray-600 max-w-2xl mx-auto p-3 shadow-md'>
                    <div className='flex items-center w-full px-2'>
                        <Search size={20} className='text-blue-500' />
                        <input type='text' placeholder='Search skills or gigs' className='p-2 w-full outline-none text-sm' ref={titleRef} />
                    </div>
                    <div className='flex items-center w-full px-2'>
                        <MapPin size={20} className='text-blue-500' />
                        <input type='text' placeholder='Location' className='p-2 w-full outline-none text-sm' ref={locationRef} />
                    </div>
                    <button onClick={onSearch} className='bg-yellow-400 px-6 py-2 rounded text-white font-medium hover:bg-yellow-500 transition'>Find 🚀</button>
                </div>
            </div>
            
            <div className='border border-gray-300 shadow-lg mx-2 mt-5 p-6 rounded-md flex flex-col items-center bg-white relative z-10'>
                <h3 className='text-lg font-semibold text-blue-800 flex items-center gap-2'><Sparkles size={24} className='text-yellow-400' /> Trusted by Top Companies</h3>
                <div className='flex justify-center gap-6 lg:gap-10 flex-wrap mt-4'>
                    <Briefcase size={32} className='text-gray-600' />
                    <Briefcase size={32} className='text-gray-600' />
                    <Briefcase size={32} className='text-gray-600' />
                    <Briefcase size={32} className='text-gray-600' />
                    <Briefcase size={32} className='text-gray-600' />
                </div>
            </div>
        </div>
    );
};

export default Hero;