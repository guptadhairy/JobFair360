import { useState, useEffect } from 'react';
import api from '../services/api';
import JobForm from '../components/jobs/JobForm'; // Create this component for job upload
import ApplicationList from '../components/jobs/ApplicationList'; // Create this component for displaying applications

export default function AdminDashboard() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage job applications and upload new jobs.</p>

      <JobForm fetchApplications={fetchApplications} /> {/* Job upload form */}
      
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <ApplicationList applications={applications} fetchApplications={fetchApplications} />
      )}
    </div>
  );
}
