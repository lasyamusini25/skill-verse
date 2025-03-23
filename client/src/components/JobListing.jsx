import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';
import { Filter, Search, Sparkles } from 'lucide-react';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]);
  };

  useEffect(() => {
    const matchesCategory = gig => selectedCategories.length === 0 || selectedCategories.includes(gig.category);
    const matchesLocation = gig => selectedLocations.length === 0 || selectedLocations.includes(gig.location);
    const matchesTitle = gig => searchFilter.title === "" || gig.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = gig => searchFilter.location === "" || gig.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs.slice().reverse().filter(
      gig => matchesCategory(gig) && matchesLocation(gig) && matchesTitle(gig) && matchesSearchLocation(gig)
    );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4 rounded-xl shadow-md'>
        {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
          <>
            <h3 className='font-medium text-lg mb-4 flex items-center gap-2'><Sparkles size={20} className='text-yellow-400' /> Current Search</h3>
            <div className='mb-4 text-gray-600'>
              {searchFilter.title && (
                <span className='inline-flex items-center gap-2.5 bg-blue-100 px-4 py-1.5 rounded'>
                  {searchFilter.title} <img onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                </span>
              )}
              {searchFilter.location && (
                <span className='ml-2 inline-flex items-center gap-2.5 bg-red-100 px-4 py-1.5 rounded'>
                  {searchFilter.location} <img onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                </span>
              )}
            </div>
          </>
        )}

        <button onClick={() => setShowFilter(prev => !prev)} className='px-6 py-2 rounded border border-gray-400 lg:hidden flex items-center gap-2'>
          <Filter size={16} /> {showFilter ? "Close" : "Filters"}
        </button>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobCategories.map((category, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input className='scale-125' type="checkbox" onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobLocations.map((location, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input className='scale-125' type="checkbox" onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)} />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-semibold text-3xl py-2 text-blue-900 flex items-center gap-2'>
          <Search size={24} className='text-indigo-600' /> Latest Gigs
        </h3>
        <p className='mb-8 text-gray-600'>Find the best gigs and start your journey!</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((gig, index) => (
            <JobCard key={index} gig={gig} />
          ))}
        </div>

        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#job-list">
              <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a key={index} href="#job-list">
                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>{index + 1}</button>
              </a>
            ))}
            <a href="#job-list">
              <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;