import { BrowserRouter as NavLink, Link } from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';

function Dashboard() {
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
    return (
        <div>
            <div style={bg}>
                <div>
                    <h3 className="text-white font-bold text-2xl text-center">WELLURANCE</h3>
                    <p className="text-amber-600 font-bold text-xl">We assure you of your well-being</p>
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
                        instantly, while dispatchers manage and track responders. By enabling faster response times, smarter 
                        resource deployment, and stronger inter-agency collaboration. Wellurance enhances public safety—while 
                        upholding the highest standards of data security and regulatory compliance.
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
                        <ul className="flex space-x-4">
                          <li>
                            <svg className="w-6 h-6 text-gray-400 hover:text-amber-600 transition" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                          </li>
                          <li>
                            <svg className="w-6 h-6 text-gray-400 hover:text-amber-600 transition" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.15 12.15 0 013 5.1a4.27 4.27 0 001.33 5.7 4.2 4.2 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.94.07 4.28 4.28 0 004 2.98A8.6 8.6 0 012 19.54 12.11 12.11 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0022.46 6z" />
                            </svg>
                          </li>
                          <li>
                            <svg className="w-6 h-6 text-gray-400 hover:text-amber-600 transition" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.5S3.88 7.5 4.98 7.5 6.96 6.62 6.96 5.5 6.08 3.5 4.98 3.5zM3.5 8.98h2.96v10.52H3.5V8.98zm4.47 0h2.83v1.43h.04c.39-.74 1.33-1.52 2.75-1.52 2.94 0 3.49 1.93 3.49 4.44v6.17h-2.97v-5.47c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.87v5.57H7.97V8.98z" />
                            </svg>
                          </li>
                          <li>
                            <svg className="w-6 h-6 text-gray-400 hover:text-amber-600 transition" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.88a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76z" />
                            </svg>
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
export default Dashboard;
