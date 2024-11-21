import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-gray-900"
      >
        Welcome to JobFair360
      </motion.h1>
      <p className="mt-4 text-lg text-gray-600">
        Your one-stop solution for job applications and recruitment.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <a href="/jobs" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
          Browse Jobs
        </a>
      </motion.div>
    </div>
  );
}
