import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Briefcase, PlusCircle } from 'lucide-react';

const ManageGigs = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  // Fetch company Gigs
  const fetchCompanyGigs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setGigs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change Gig Visibility
  const changeGigVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visiblity`,
        { id },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyGigs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyGigs();
    }
  }, [companyToken]);

  return gigs ? (
    gigs.length === 0 ? (
      <div className='relative flex items-center justify-center h-[70vh]'>
        <div className='absolute -z-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-50 top-10 left-10'></div>
        <div className='absolute -z-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-40 bottom-10 right-10'></div>
        <p className='text-xl sm:text-2xl text-blue-600'>No Gigs Available 😕</p>
      </div>
    ) : (
      <div className='relative container p-6 max-w-5xl bg-blue-50 shadow-lg rounded-lg overflow-hidden'>
        <div className='absolute -z-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-50 top-[-40px] left-[-40px]'></div>
        <div className='absolute -z-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-40 bottom-[-40px] right-[-40px]'></div>
        <h2 className='text-2xl font-semibold text-blue-700 flex items-center gap-2'><Briefcase /> Manage Your Gigs</h2>
        <div className='overflow-x-auto mt-4'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-md'>
            <thead>
              <tr className='bg-blue-200 text-blue-900'>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
                <th className='py-2 px-4 border-b text-left'>Gig Title</th>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-2 px-4 border-b text-center'>Applicants</th>
                <th className='py-2 px-4 border-b text-left'>Visible</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig, index) => (
                <tr key={index} className='text-gray-700 hover:bg-blue-100'>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
                  <td className='py-2 px-4 border-b'>{gig.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{moment(gig.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{gig.location}</td>
                  <td className='py-2 px-4 border-b text-center'>{gig.applicants}</td>
                  <td className='py-2 px-4 border-b'>
                    <input
                      onChange={() => changeGigVisibility(gig._id)}
                      className='scale-125 ml-4 cursor-pointer'
                      type='checkbox'
                      checked={gig.visible}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            onClick={() => navigate('/dashboard/add-job')}
            className='bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all'
          >
            <PlusCircle /> Add New Gig
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageGigs;
