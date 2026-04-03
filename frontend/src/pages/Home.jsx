import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* HERO SECTION WITH BACKGROUND PHOTO */}
      <section 
        className="relative h-[85vh] flex items-center justify-center text-center text-white bg-cover bg-fixed bg-center"
        style={{ 
          // Professional Academy/Library Image
          backgroundImage: `url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop')` 
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        <div className="relative z-10 max-w-5xl px-6">
          <span className="inline-block bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 animate-fade-in">
            Digital Learning Revolution
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            Master Your <span className="text-blue-500">Future</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for GCE O/L and A/L students. Access expert notes, past papers, and guidance from the island's top lecturers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/notes" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-500/20">
              Get Started
            </Link>
            <Link to="/professionals" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-12 py-5 rounded-2xl font-black text-xl transition-all transform hover:-translate-y-1">
              Meet Lecturers
            </Link>
          </div>
        </div>
      </section>

      {/* TRUSTED BY STUDENTS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-12">Empowering Success Across the Island</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <p className="text-5xl font-black text-gray-900">20k+</p>
              <p className="text-blue-600 font-bold mt-2">Active Students</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gray-900">500+</p>
              <p className="text-blue-600 font-bold mt-2">Free Resources</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gray-900">98%</p>
              <p className="text-blue-600 font-bold mt-2">Pass Rate</p>
            </div>
            <div>
              <p className="text-5xl font-black text-gray-900">24/7</p>
              <p className="text-blue-600 font-bold mt-2">Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY BACKGROUND SECTION (CTA) */}
      <section 
        className="relative py-32 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop')` 
        }}
      >
        <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Stop Searching. <br/>Start Scoring.
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join the most comprehensive digital library designed specifically for the local curriculum. Everything you need, from theory to marks, is just one click away.
          </p>
          <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-14 py-5 rounded-2xl font-black text-xl transition-all shadow-xl">
            Register for Free
          </Link>
        </div>
      </section>

      {/* FOOTER SPACE */}
      <section className="py-20 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h4 className="font-black text-2xl mb-4">SIPSARA<span className="text-blue-600">NOTES</span></h4>
            <p className="text-gray-500 leading-relaxed">Dedicated to providing high-quality educational resources for the next generation of leaders in Sri Lanka.</p>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6 underline decoration-blue-600 underline-offset-8">Quick Links</h4>
            <ul className="space-y-3 font-bold text-gray-700">
              <li><Link to="/notes" className="hover:text-blue-600">Study Materials</Link></li>
              <li><Link to="/papers" className="hover:text-blue-600">Past Papers</Link></li>
              <li><Link to="/professionals" className="hover:text-blue-600">Our Teachers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6 underline decoration-blue-600 underline-offset-8">Support</h4>
            <ul className="space-y-3 font-bold text-gray-700">
              <li><Link to="/" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}