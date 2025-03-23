import { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Briefcase, MapPin, Layers, DollarSign, PlusCircle } from 'lucide-react';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const { backendUrl, companyToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const description = quillRef.current.root.innerHTML;
            const { data } = await axios.post(`${backendUrl}/api/company/post-gig`,
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success("🎉 " + data.message);
                setTitle('');
                setSalary(0);
                quillRef.current.root.innerHTML = "";
            } else {
                toast.error("⚠️ " + data.message);
            }
        } catch (error) {
            toast.error("❌ " + error.message);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='container p-6 flex flex-col w-full items-start gap-4 bg-blue-100 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-700 flex items-center gap-2'><Briefcase /> Post a New Gig 🚀</h2>

            <div className='w-full'>
                <p className='mb-2 text-blue-700'>Gig Title</p>
                <input type='text' placeholder='Type here...'
                    onChange={e => setTitle(e.target.value)} value={title} required
                    className='w-full max-w-lg px-3 py-2 border-2 border-blue-300 rounded bg-white' />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2 text-blue-700'>Gig Description</p>
                <div ref={editorRef} className='border-2 border-blue-300 rounded bg-white p-2 min-h-[100px]'></div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
                <div>
                    <p className='mb-2 text-blue-700 flex items-center gap-1'><Layers /> Gig Category</p>
                    <select className='w-full px-3 py-2 border-2 border-blue-300 rounded bg-white'
                        onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2 text-blue-700 flex items-center gap-1'><MapPin /> Gig Location</p>
                    <select className='w-full px-3 py-2 border-2 border-blue-300 rounded bg-white'
                        onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2 text-blue-700'>Gig Level</p>
                    <select className='w-full px-3 py-2 border-2 border-blue-300 rounded bg-white'
                        onChange={e => setLevel(e.target.value)}>
                        <option value='Beginner level'>Beginner level</option>
                        <option value='Intermediate level'>Intermediate level</option>
                        <option value='Senior level'>Senior level</option>
                    </select>
                </div>
            </div>

            <div>
                <p className='mb-2 text-blue-700 flex items-center gap-1'><DollarSign /> Gig Salary</p>
                <input min={0} className='w-full px-3 py-2 border-2 border-blue-300 rounded bg-white sm:w-[120px]'
                    onChange={e => setSalary(e.target.value)} type='number' placeholder='2500' />
            </div>

            <button className='w-32 py-3 mt-4 bg-blue-600 text-white rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition-all'>
                <PlusCircle /> ADD GIG
            </button>
        </form>
    );
};

export default AddJob;