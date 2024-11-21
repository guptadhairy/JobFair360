import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.data.job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);
    try {
      await api.post(`/applications`, {
        job: id,
        coverLetter
      });
      navigate('/applications');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to apply for the job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <div className="mt-2 flex items-center text-gray-500">
            <span className="text-lg">{job.company}</span>
            <span className="mx-2">•</span>
            <span>{job.location}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{job.type}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
            <ul className="mt-2 list-disc list-inside text-gray-600">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {user?.role === 'candidate' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <form onSubmit={handleApply}>
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={applying}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {applying ? 'Applying...' : 'Apply Now'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
