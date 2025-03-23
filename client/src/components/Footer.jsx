import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Sparkles, Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <div 
      className='relative container px-4 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 py-6 mt-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg overflow-hidden'
    >
      <div className='flex items-center gap-3'>
        <Rocket size={40} className='text-yellow-300 animate-bounce' />
        <h1 className='text-2xl font-bold tracking-wide'>SkillVerse 🚀</h1>
      </div>
      <p className='text-center sm:text-left text-sm text-blue-200 flex items-center gap-2'>
        <Sparkles size={18} className='text-yellow-300' /> Empowering Students | Learn, Earn & Shine ✨
      </p>
      <div className='flex gap-4'>
        <a href='#' className='hover:text-yellow-300 transition'><FaFacebook size={32} /></a>
        <a href='#' className='hover:text-yellow-300 transition'><FaTwitter size={32} /></a>
        <a href='#' className='hover:text-yellow-300 transition'><FaInstagram size={32} /></a>
      </div>
    </div>
  );
};

export default Footer;