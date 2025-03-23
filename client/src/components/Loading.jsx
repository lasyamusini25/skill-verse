import { Sparkles } from 'lucide-react';

const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-blue-600'>
      <div className='relative w-20 h-20'>
        <div className='w-full h-full border-4 border-blue-300 border-t-4 border-t-blue-600 rounded-full animate-spin'></div>
        <Sparkles size={28} className='absolute top-0 right-0 text-yellow-400 animate-pulse' />
      </div>
      <p className='mt-4 text-lg font-semibold'>Loading awesome gigs for you...</p>
    </div>
  );
};

export default Loading;
