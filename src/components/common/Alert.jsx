export default function Alert({ message }) {
  return (
    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
      {message}
    </div>
  );
}
