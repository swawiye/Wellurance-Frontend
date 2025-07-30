import {NavLink} from 'react-router-dom';
import EmergencyForm from './EForm';

function Home() {
  return (
      <div>
          <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <a href="/home" className="text-2xl font-bold text-amber-600 hover:text-amber-500 transition">
                    WELLURANCE
                  </a>
                </div>
                {/* Navigation Links */}
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
                        `text-gray-300 hover:text-amber-600 transition font-medium 
                        ${isActive ? 'text-amber-600 underline underline-offset-4 decoration-amber-500' : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
                
                {/* Optional Mobile Menu Button */}
                <div className="md:hidden">
                  {/* Add your mobile menu toggle logic here */}
                  <button className="text-gray-300 hover:text-amber-600 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="bg-gray-50 bg-opacity-90 max-w-full w-full px-10 py-10">
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
