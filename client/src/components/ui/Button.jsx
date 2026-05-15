export default function Button({ children }) {
  return (
    <button className="bg-primary text-white px-5 py-2 rounded hover:opacity-90">
      {children}
    </button>
  );
}