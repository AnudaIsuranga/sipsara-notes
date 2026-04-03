export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-2">SipsaraNotes Sri Lanka</h2>
        <p className="text-gray-400 text-sm">Providing top-quality O/L and A/L educational materials for the next generation.</p>
        <p className="text-gray-500 text-xs mt-4">© {new Date().getFullYear()} SipsaraNotes. All rights reserved.</p>
      </div>
    </footer>
  );
}