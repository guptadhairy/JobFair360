import { useState } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import api from '../../services/api';

export default function JobForm({ fetchApplications }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: 'full-time',
    requirements: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim()),
      });
      setSuccess(true);
      setError('');
      setFormData({
        title: '',
        company: '',
        description: '',
        location: '',
        type: 'full-time',
        requirements: '',
      });
      fetchApplications(); // Refresh applications after adding a job
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-gray-900">Upload New Job</h2>
      {error && <Alert message={error} />}
      {success && <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">Job uploaded successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Job Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
        </select>
        <input
          type="text"
          placeholder="Requirements (comma separated)"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <Button type="submit">Upload Job</Button>
      </form>
    </div>
  );
}
