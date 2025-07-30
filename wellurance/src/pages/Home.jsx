import {NavLink, useNavigate} from 'react-router-dom';
import EmergencyForm from './EForm';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Home() {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <div>
        <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/home" className="text-2xl font-bold text-amber-600 hover:text-amber-500 transition">
                  WELLURANCE
                </a>
              </div>
              {/* Navigation links */}
              <nav className="hidden md:flex space-x-8 items-center">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-amber-600 transition font-medium ${
                      isActive ? "text-amber-600 underline underline-offset-4 decoration-amber-500" : ""
                    }`
                  }
                >
                  Emergency Services
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-amber-600 transition font-medium ${
                      isActive ? "text-amber-600 underline underline-offset-4 decoration-amber-500" : ""
                    }`
                  }
                >
                  About Us
                </NavLink>
                
                {/* Profile dropdown */}
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-amber-600 transition"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </button>
                
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-amber-100 transition"
                    >
                      Update Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-amber-100 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>
                
        <div className="bg-gray-50 bg-opacity-90 max-w-full w-full px-10 py-10 mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-red-600 mt-5">
              ENTER YOUR EMERGENCY VICTIM'S DETAILS
            </h2>
            
        <div className="flex justify-center mt-10">
          <EmergencyForm/>
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
export default Home;

{/* <div className="md:hidden"> */}
  {/* Add your mobile menu toggle logic here */}
  {/* <button className="text-gray-300 hover:text-amber-600 focus:outline-none">
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div> */}