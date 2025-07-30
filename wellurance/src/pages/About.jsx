import {NavLink} from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';

function About() {
    const bg = {
      backgroundImage: `url(${bgImg})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '80vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 1.5s ease-in-out',
    };
    return (
      <div>
        {/* Navbar */}
        <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <a href="#hero" className="text-2xl font-bold text-amber-600 hover:text-amber-500 transition">
                  WELLURANCE
                </a>
              </div>
              <nav className="hidden md:flex space-x-8">
                {[
                  { to: "/services", label: "Emergency Services" },
                  { to: "/about", label: "About Us" },
                  { to: "/profile", label: "Profile" },
                ].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `text-gray-300 hover:text-amber-600 transition font-medium ${
                        isActive
                          ? "text-amber-600 underline underline-offset-4 decoration-amber-500"
                          : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </header>
              
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen w-full bg-black flex flex-col items-center justify-center space-y-6 pt-16"
          style={bg}
        >
        </section>
        <div className="bg-gray-50 bg-opacity-90 max-w-full w-full px-10 py-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-red-600 mt-5">
              OUR STORY
            </h2>
            
            <div className="flex justify-center mt-10">
                <p>
                Wellurance: Built to Save Lives
                In emergencies, every second matters. But too often, delays and disjointed systems cost lives.
                Wellurance was born to change that. It is a modern, full-stack emergency services platform, 
                that connects healthcare and firefighting units in real-time -whether in cities, towns, or rural 
                areas. Wellurance enables people to report emergencies instantly. Dispatchers respond with live, 
                map-based dashboards that assign and track responders efficiently. This results in faster response
                times, smarter resource use and safer communities. Wellurance isn’t just software. It’s a life-saving 
                network engineered for speed, built on trust, and designed to protect everyone, everywhere.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5 mb-7">
            <div className="px-10 py-10 mt-20">
                <img src="src\assets\community.jpg"/>
            </div>
            <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50">
                <h3 className="font-semibold text-2xl text-red-600 text-center mt-5">CONTACT US</h3>
                <p className="text-md text-black text-center">Phone: +254 712 345 678</p>
                <p className="text-md text-black text-center">Email address: wellurance@gmail.com</p>
                <div className="px-10 py-10">
                    <img src="src\assets\wellurance location.png"/>
                </div>
            </div>
        </div>
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h3 className="text-amber-600 font-bold text-2xl">WELLURANCE</h3>
                    <p className="text-gray-300">We assure you of your well-being</p>
                    <div className="flex space-x-4">
                        {/* Social media icons would go here */}
                        <a href="#" className="text-gray-400 hover:text-amber-600 transition">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                        </a>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-amber-600 font-semibold text-lg">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/home" className="text-gray-300 hover:text-amber-600 transition">Home</a></li>
                        <li><a href="/services" className="text-gray-300 hover:text-amber-600 transition">Emergency Services</a></li>
                        <li><a href="/about" className="text-gray-300 hover:text-amber-600 transition">About Us</a></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="text-amber-600 font-semibold text-lg">Contact Us</h4>
                    <address className="text-gray-300 not-italic">
                        <p>Safety Street</p>
                        <p>Utu Towers, 6th Floor</p>
                        <p>Phone: +254 712 345 678</p>
                        <p>Email: wellurance@gmail.com</p>
                    </address>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Wellurance. All rights reserved.</p>
            </div>
        </footer>
      </div>
    )
}
export default About;
