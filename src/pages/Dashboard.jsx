import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications');
      setApplications(response.data.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage job applications</p>

        <div className="mt-6">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
              <p className="mt-2 text-gray-600">No candidates have applied for jobs yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{application.job.title}</h3>
                  <p className="text-gray-600">{application.job.company}</p>
                  <p className="mt-2 text-gray-500">Candidate: {application.candidate.name}</p>
                  <p className="mt-2 text-gray-500">Status: {application.status}</p>
                  <p className="mt-2 text-gray-500">Applied on: {new Date(application.appliedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
