import {NavLink} from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';
import EmergencyForm from './EForm';

function Home() {
    const bg = {
      backgroundImage: `url(${bgImg})`, //`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '60vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 1.5s ease-in-out',
    };

    return (
        <div>
            <div
              className="relative h-screen w-full bg-black flex flex-col items-center justify-center space-y-6"
              style={bg}
            >
              <h1 className="text-2xl font-bold text-amber-600">
                <a href="/">WELLURANCE</a>
              </h1>
              <div className="flex space-x-6">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `text-black hover:text-amber-600 ${isActive ? 'underline underline-offset-4 decoration-amber-500 text-amber-600' : ''}`
                  }
                >
                  Emergency Services
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-black hover:text-amber-600 ${isActive ? 'underline underline-offset-4  decoration-amber-500 text-amber-600' : ''}`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-black hover:text-amber-600 ${isActive ? 'underline underline-offset-4  decoration-amber-500 text-amber-600' : ''}`
                  }
                >
                  Profile
                </NavLink>
              </div>
            </div>

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
                            <li><a href="/" className="text-gray-300 hover:text-amber-600 transition">Home</a></li>
                            <li><a href="/services" className="text-gray-300 hover:text-amber-600 transition">Emergency Services</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-amber-600 transition">About Us</a></li>
                            <li><a href="/dashboard" className="text-gray-300 hover:text-amber-600 transition">Dashboard</a></li>
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
