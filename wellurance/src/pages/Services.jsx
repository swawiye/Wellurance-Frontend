import {NavLink, useNavigate} from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function EmergencyServices() {
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
 
          {/* Hero Section */}
          <section
            id="hero"
            className="relative h-screen w-full bg-black flex flex-col items-center justify-center space-y-6 pt-16"
            style={bg}
          >
            <h1 className="text-xl md:text-4xl font-bold text-amber-500 drop-shadow-sm">
             Your Safety, Our Priority
            </h1>
          </section>

          <div className="bg-gray-50 bg-opacity-90 max-w-full w-full min-h-screen py-20 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-2">
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Rapid On-Scene Response</h3>
                      <p className="text-md text-black text-center mt-10">
                      Our ambulance crews arrive at the scene of an incident as quickly as possible after a call is received.
                      This immediate response is essential for assessing the situation, identifying life-threatening conditions, 
                      and delivering urgent medical care. Trained EMTs or paramedics quickly evaluate the patient, perform triage 
                      if multiple individuals are involved, and begin interventions such as CPR, bleeding control, or airway management. 
                      The speed and efficiency of on-scene response can dramatically influence patient outcomes, especially in time-sensitive 
                      emergencies like cardiac arrests, severe trauma, or strokes. A well-coordinated, rapid response ensures that critical care 
                      begins not at the hospital, but the moment help arrives.
                      </p>
                  </div>
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Fire Suppression</h3>
                      <p className="text-md text-black text-center mt-10">
                          Fire suppression is the core responsibility of firefighters and involves responding to and extinguishing fires in homes, buildings, vehicles, 
                          forests, and industrial settings. Firefighters use specialized equipment such as hoses, ladders, water pumps, and foam systems to combat flames. 
                          They also employ ventilation techniques to release smoke and reduce heat buildup inside structures. Fire suppression isn’t just about putting out 
                          flames—it’s about protecting lives, limiting property damage, and preventing fires from spreading to nearby structures or natural areas. Every 
                          response is a high-stakes operation, requiring teamwork, training, and quick decision-making.
                      </p>
                  </div>
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 mt-5">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Search and Rescue</h3>
                      <p className="text-md text-black text-center mt-10">
                          In emergencies such as house fires, building collapses, or natural disasters, firefighters perform search and rescue operations to locate and 
                          save individuals who are trapped, unconscious, or missing. Wearing heavy protective gear and navigating through smoke, debris, and hazardous 
                          conditions, they often enter dangerous environments to extract victims. This may involve breaching walls, navigating narrow spaces, or lifting 
                          heavy objects. Search and rescue is physically demanding and time-sensitive —firefighters are trained to make rapid assessments of unstable 
                          environments to save lives while minimizing risk to themselves and others.
                      </p>
                  </div>
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 mt-5">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Vehicle Extraction</h3>
                      <p className="text-md text-black text-center mt-10">
                          In severe motor vehicle accidents, victims can become trapped inside crushed or overturned vehicles. Firefighters are specially trained in vehicle 
                          extrication, using hydraulic tools like the "Jaws of Life" to cut through metal, pry open doors, or remove roofs. This delicate operation requires 
                          both strength and precision to avoid worsening a patient’s injuries. Firefighters coordinate closely with EMS personnel on-scene, ensuring victims 
                          are stabilized and safely removed without delay. Their role is vital in time-sensitive trauma care, especially in high-speed collisions or rollovers.
                      </p>
                  </div>
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 mt-5">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Hazardous Materials (HAZMAT) Response</h3>
                      <p className="text-md text-black text-center mt-10">
                          Firefighters are also trained to handle hazardous materials incidents, where dangerous chemicals, gases, or biological substances are involved. 
                          Whether it's a chemical spill on a highway, a gas leak in a neighborhood, or an industrial plant malfunction, HAZMAT response requires specialized 
                          equipment and protective suits. Firefighters work to identify the substance, contain or neutralize the threat, evacuate nearby areas if necessary, 
                          and prevent environmental contamination. Their expertise ensures the safety of both the public and other emergency responders in highly volatile 
                          situations.
                      </p>
                  </div>
                  <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 mt-5">
                      <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Disaster Response and Recovery</h3>
                      <p className="text-md text-black text-center mt-10">
                          During large-scale natural or man-made disasters—such as hurricanes, floods, wildfires, or earthquakes—firefighters are often among the first on the 
                          scene. They conduct evacuations, provide emergency shelter support, assist in rescue missions, and help clear debris from affected areas. Their presence 
                          ensures that emergency services remain operational during crises. After the immediate danger has passed, firefighters continue to support recovery efforts 
                          by assessing structural damage, restoring public safety infrastructure, and offering aid to displaced individuals and families.
                      </p>
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
export default EmergencyServices;
