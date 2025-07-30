import { NavLink, useNavigate } from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';
import { AuthContext } from './AuthContext';
import { useContext, useState } from 'react';

function Profile() {
    const {user, logout, updateUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState(null);

    const handleLogout = () => {
      logout();
      navigate('/');
    };

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

    const [formData, setFormData] = useState({
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        address: user?.address || ''
    });

    // Toggle edit mode
    const toggleEdit = () => {
      if (isEditing) {
        // Reset form when canceling edit
        setFormData({
            email: user?.email || '',
            phone_number: user?.phone_number || '',
            address: user?.address || ''
        });
        setError(null);
      }
      setIsEditing(!isEditing);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            await updateUser(formData);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error('Update error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update your form inputs to be conditionally editable
    const inputProps = (fieldName) => ({
        name: fieldName,
        value: formData[fieldName],
        onChange: handleInputChange,
        readOnly: !isEditing,
        className: `w-full p-3 border ${isEditing ? 'border-amber-400 bg-amber-50' : 'border-gray-300 bg-white'} rounded-md`
    }); 

    if (!user) {
      return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <p className="text-gray-700 text-lg">Loading user profile...</p>
        </div>
      )
    }

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

        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen w-full bg-black flex flex-col items-center justify-center space-y-6 pt-16"
          style={bg}
        >
          <p className="text-xl md:text-4xl font-bold text-amber-500 drop-shadow-sm">Hi {user.username}!</p>
        </section>

        <div className="bg-gray-50 bg-opacity-90 w-full px-6 py-16 flex justify-center">
          <div className="border border-amber-200 bg-white p-10 rounded-xl shadow-md w-full max-w-2xl hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-amber-600">Your Profile</h2>
              <button
                type="button"
                onClick={toggleEdit}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  isEditing 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isEditing ? 'Cancel' : 'Update Profile'}
              </button>
            </div>
              
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username (always read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  value={user?.username || ''}
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...inputProps('email')}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...inputProps('phone_number')}
                />
              </div>

              {/* Role (always read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Role</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                  value={user?.role || ''}
                  readOnly
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                <input
                  type="text"
                  {...inputProps('address')}
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition w-full ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
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
    );
}

export default Profile;

