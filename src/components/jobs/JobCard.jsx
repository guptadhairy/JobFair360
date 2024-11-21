import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="text-gray-600 mt-1">{job.company}</p>
      <div className="mt-4 flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {job.location}
        </span>
        <span className="text-sm text-gray-500">
          <i className="fas fa-clock mr-2"></i>
          {job.type}
        </span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 3).map((req, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded"
            >
              {req}
            </span>
          ))}
        </div>
        <Link
          to={`/jobs/${job._id}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}
