import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }) {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </motion.button>
  );
}
