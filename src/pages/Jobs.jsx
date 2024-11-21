import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import JobCard from '../components/jobs/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || job.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Positions</h1>
          <p className="mt-2 text-gray-600">Find your next opportunity</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
