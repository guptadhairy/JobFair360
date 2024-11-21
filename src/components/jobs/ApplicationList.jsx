import { useState } from 'react';
import Button from '../common/Button';
import api from '../../services/api';

export default function ApplicationList({ applications, fetchApplications }) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (applicationId, newStatus) => {
    setLoading(true);
    try {
      await api.patch(`/applications/${applicationId}/status`, { status: newStatus });
      fetchApplications(); // Refresh applications after changing status
    } catch (error) {
      console.error('Error changing application status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{application.job.title}</h3>
          <p className="text-gray-600">{application.job.company}</p>
          <p className="mt-2 text-gray-500">Candidate: {application.candidate.name}</p>
          <p className="mt-2 text-gray-500">Status: {application.status}</p>
          <div className="mt-4 flex space-x-2">
            <Button onClick={() => changeStatus(application._id, 'accepted')} disabled={loading}>Accept</Button>
            <Button onClick={() => changeStatus(application._id, 'rejected')} disabled={loading}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
