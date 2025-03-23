import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { FileUp, Pencil, CheckCircle, FileText } from 'lucide-react';

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return userData ? (
    <>
      <Navbar />
      <div className='container px-6 min-h-[70vh] mx-auto my-10 text-[#1E3A8A]'>
        <h2 className='text-2xl font-bold flex items-center gap-2'>📄 Your Resume</h2>
        <div className='flex gap-4 mb-6 mt-3 items-center'>
          {isEdit || userData?.resume === "" ? (
            <>
              <label className='flex items-center cursor-pointer gap-2 bg-blue-200 px-4 py-2 rounded-lg'>
                <FileUp className='w-5 h-5' />
                <p>{resume ? resume.name : "Select Resume"}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
              </label>
              <button onClick={updateResume} className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                <CheckCircle className='w-5 h-5' /> Save
              </button>
            </>
          ) : (
            <div className='flex gap-4 items-center'>
              <a target='_blank' href={userData.resume} className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                <FileText className='w-5 h-5' /> Resume
              </a>
              <button onClick={() => setIsEdit(true)} className='bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2'>
                <Pencil className='w-5 h-5' /> Edit
              </button>
            </div>
          )}
        </div>
        <h2 className='text-2xl font-bold mb-4'>🚀 Jobs Applied</h2>
        <div className='overflow-x-auto bg-white shadow-lg rounded-lg'>
          <table className='w-full text-left rounded-lg'>
            <thead className='bg-blue-600 text-white'>
              <tr>
                <th className='py-3 px-4'>Company</th>
                <th className='py-3 px-4'>Job Title</th>
                <th className='py-3 px-4 hidden sm:table-cell'>Location</th>
                <th className='py-3 px-4 hidden sm:table-cell'>Date</th>
                <th className='py-3 px-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => (
                <tr key={index} className='border-b hover:bg-blue-50'>
                  <td className='py-3 px-4 flex items-center gap-2'>
                    <img className='w-8 h-8 rounded-full' src={job.companyId.image} alt='' />
                    {job.companyId.name}
                  </td>
                  <td className='py-3 px-4'>{job.jobId.title}</td>
                  <td className='py-3 px-4 hidden sm:table-cell'>{job.jobId.location}</td>
                  <td className='py-3 px-4 hidden sm:table-cell'>{moment(job.date).format('ll')}</td>
                  <td className='py-3 px-4'>
                    <span className={`px-4 py-1.5 rounded-lg ${job.status === 'Accepted' ? 'bg-green-400 text-white' : job.status === 'Rejected' ? 'bg-red-400 text-white' : 'bg-blue-400 text-white'}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />;
};

export default Applications;