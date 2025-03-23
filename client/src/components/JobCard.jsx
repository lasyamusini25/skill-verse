import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Rocket, Sparkles } from 'lucide-react';

const JobCard = ({ gig }) => {
  const navigate = useNavigate();

  return (
    <div className='border p-6 shadow-lg rounded-xl bg-gradient-to-r from-blue-50 to-indigo-100 relative overflow-hidden'>
      <div className='absolute top-2 right-2 text-yellow-400'>
        <Sparkles size={24} className='animate-spin-slow' />
      </div>
      <div className='flex justify-between items-center'>
        <img className='h-10 rounded-full border-2 border-blue-500' src={gig.companyId.image} alt='Company Logo' />
      </div>
      <h4 className='font-semibold text-xl mt-3 text-blue-900 flex items-center gap-2'>
        <Briefcase size={20} className='text-indigo-600' /> {gig.title}
      </h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-200 text-blue-900 px-4 py-1.5 rounded flex items-center gap-1'>
          <MapPin size={14} /> {gig.location}
        </span>
        <span className='bg-red-200 text-red-900 px-4 py-1.5 rounded'>{gig.level}</span>
      </div>
      <p className='text-gray-700 text-sm mt-4' dangerouslySetInnerHTML={{ __html: gig.description.slice(0, 150) + '...' }}></p>
      <div className='mt-4 flex gap-4 text-sm'>
        <button onClick={() => { navigate(`/apply-gig/${gig._id}`); scrollTo(0, 0) }} className='bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-1'>
          Apply Now <Rocket size={16} />
        </button>
        <button onClick={() => { navigate(`/apply-gig/${gig._id}`); scrollTo(0, 0) }} className='text-gray-700 border border-gray-500 rounded-lg px-4 py-2 shadow-md'>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;