import { BrowserRouter as NavLink, Link } from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext} from './AuthToken';
import axios from 'axios';

function AdminDash() {
    const bg = {
            backgroundImage: `url(${bgImg})`,
            height: "100vh",
            marginTop: "-70px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
    };
    const { token, user } = useContext(AuthContext);
    const [emergencies, setEmergencies] = useState([]);

    useEffect(() => {
    if (user?.role === 'DISPATCHER') {
      axios.get('/api/reports/', {
        headers: { Authorization: `Token ${token}` }
      }).then(res => setEmergencies(res.data));
    }
    }, [token, user]);

    return (
        <div>
            <div style={bg}>
                <div>
                    <h3 className="text-white font-bold text-2xl text-center">WELLURANCE</h3>
                    <div className="text-amber-600 font-bold text-xl">
                        <h1>Welcome {user?.username}</h1>
                            {user?.role === 'DISPATCHER' ? (
                            emergencies.map(report => (
                              <div key={report.id}>
                                <h3>{report.description}</h3>
                                <p>{report.address}</p>
                              </div>
                            ))
                            ) : (
                            <p>You are not authorized.</p>
                            )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div className="px-10 py-10">
                    <img src="src\assets\Firefighters.jpg"/>
                </div>
            
                <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50">
                    <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Firefighters</h3>
                    <p className="text-md text-black text-center mt-10">
                        Firefighters respond to fires, accidents, and other emergencies to protect 
                        lives, property, and the environment. They rescue people from dangerous situations, 
                        extinguish fires, and provide first aid when needed. Firefighters also work closely with 
                        ambulance teams and other responders to handle emergencies quickly and safely. Through our 
                        real-time emergency platform, they’re dispatched instantly and tracked live to ensure the 
                        fastest possible response.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div className="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50">
                    <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">Ambulance services and Paramedics</h3>
                    <p className="text-md text-black text-center mt-10">
                        Paramedics and ambulance teams provide urgent medical care during emergencies. They respond quickly to emregncy calls, 
                        treat injuries or illnesses on-site, and transport patients safely to hospitals. Working closely with firefighters and 
                        other responders, paramedics help save lives with fast, expert care. Our platform helps them reach the scene faster with 
                        live tracking and real-time coordination for better outcomes.
                    </p>
                </div>

                <div className="px-10 py-10">
                    <img src="src\assets\Paramedics.jpg"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 mx-auto max-w-6xl gap-4 mt-5">
                <div className="border border-gray-50 px-10 py-10 rounded-xl bg-gray-50">
                    <h3 className="font-semibold text-2xl text-amber-600 text-center mt-5">What is Wellurance?</h3>
                    <p className="text-xl text-black text-center mt-10">
                        Wellurance is an emergency services platform is built to streamline real-time coordination between 
                        ambulance teams, healthcare providers, and firefighting units. It allows you to report emergencies 
                        instantly, while dispatchers manage and track responders live through intuitive, map-based dashboards. 
                        By enabling faster response times, smarter resource deployment, and stronger inter-agency collaboration, 
                        Wellurance enhances public safety—while upholding the highest standards of data security and regulatory 
                        compliance.
                    </p>
                </div>
            </div>
            
            <div className="flex justify-center mt-5 mb-6">
                <div className="px-10 py-10 rounded-xl bg-amber-600 w-60 items-center flex justify-center hover:bg-amber-500 transition">
                    <button className="font-semibold text-lg text-white text-center"><Link to="/register">Get Started to receive emergency services today</Link></button>
                </div>
            </div>

            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-amber-600 font-bold text-2xl">WELLURANCE</h3>
                        <p className="text-gray-300">We assure you of your well-being</p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-amber-600 font-semibold text-lg">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                {/* Social media icons would go here */}
                                <a href="#" className="text-gray-400 hover:text-amber-600 transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
                                </a>
                            </li>
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
export default AdminDash;
