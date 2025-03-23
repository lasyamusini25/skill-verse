import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Download, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import Loading from '../components/Loading';

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className='flex items-center justify-center h-[70vh] bg-blue-100 rounded-xl shadow-lg'>
        <p className='text-xl sm:text-2xl text-blue-600 font-bold'>No Applications Available 🚀</p>
      </div>
    ) : (
      <div className='container mx-auto p-6 relative'>
        <div className='absolute -top-16 -left-10 w-40 h-40 bg-blue-300 rounded-full opacity-50 blur-lg'></div>
        <div className='absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-lg'></div>
        <div className='bg-white p-6 rounded-2xl shadow-xl border border-blue-300'>
          <h1 className='text-3xl font-bold text-blue-600 mb-4 flex items-center justify-center'>📜 Job Applications</h1>
          <table className='w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='py-3 px-4 text-left'>#</th>
                <th className='py-3 px-4 text-left'>User</th>
                <th className='py-3 px-4 text-left max-sm:hidden'>Job Title</th>
                <th className='py-3 px-4 text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 text-left'>Resume</th>
                <th className='py-3 px-4 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className='border-b hover:bg-blue-50 transition'>
                  <td className='py-3 px-4 text-center'>{index + 1}</td>
                  <td className='py-3 px-4 text-center flex items-center gap-3'>
                    <img className='w-10 h-10 rounded-full' src={applicant.userId.image} alt='' />
                    <span className='font-medium text-blue-700'>{applicant.userId.name}</span>
                  </td>
                  <td className='py-3 px-4 max-sm:hidden'>{applicant.jobId.title}</td>
                  <td className='py-3 px-4 max-sm:hidden'>{applicant.jobId.location}</td>
                  <td className='py-3 px-4'>
                    <a
                      href={applicant.userId.resume}
                      target='_blank'
                      className='flex items-center gap-2 text-blue-500 hover:text-blue-700 transition'
                    >
                      Resume <Download size={18} />
                    </a>
                  </td>
                  <td className='py-3 px-4'>
                    {applicant.status === 'Pending' ? (
                      <div className='relative inline-block text-left'>
                        <button className='text-gray-500'><MoreVertical size={18} /></button>
                        <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md'>
                          <button
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                            className='flex items-center gap-2 px-4 py-2 w-full text-green-600 hover:bg-gray-100'
                          >
                            <CheckCircle size={16} /> Accept
                          </button>
                          <button
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                            className='flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100'
                          >
                            <XCircle size={16} /> Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-white ${applicant.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}>{applicant.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;