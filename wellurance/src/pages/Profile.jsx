import { NavLink } from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';

function Profile() {
    const bg = {
      backgroundImage: `url(${bgImg})`,
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
        {/* Header */}
        <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center space-y-6" style={bg}>
          <h1 className="text-2xl font-bold text-amber-600"><a href="/">WELLURANCE</a></h1>
          <div className="flex space-x-6">
            <NavLink to="/services" className="text-black hover:text-amber-600">Emergency Services</NavLink>
            <NavLink to="/about" className="text-black hover:text-amber-600">About Us</NavLink>
            <NavLink to="/profile" className="text-black hover:text-amber-600">Profile</NavLink>
          </div>
        </div>  

        {/* Profile Card */}
        <div className="bg-gray-50 bg-opacity-90 w-full px-6 py-16 flex justify-center">
          <div className="border border-amber-200 bg-white p-10 rounded-xl shadow-md w-full max-w-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">User Profile</h2>    
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  placeholder="John Doe"
                />
              </div>    
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  placeholder="john@example.com"
                />
              </div>    
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  placeholder="+254 712 345 678"
                />
              </div>    
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white"
                  placeholder="123 Main Street, Nairobi"
                />
              </div>    
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-600 transition"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div> 

        <div className="bg-gray-50 bg-opacity-90 w-full px-6 py-16 flex justify-center">
            <button
                type="submit"
                className="w-60 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                <a href="/dashboard">Sign Out</a>
            </button>
        </div> 

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-amber-600 font-bold text-2xl">WELLURANCE</h3>
              <p className="text-gray-300">We assure you of your well-being</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-600 transition">
                  {/* Example social icon */}
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
    );
}

export default Profile;
