import { BrowserRouter as NavLink } from 'react-router-dom';
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
            <div class="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div class="px-10 py-10">
                    <img src="src\assets\Firefighters.jpg"/>
                </div>
            
                <div class="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50">
                    <h3 class="font-semibold text-2xl text-amber-600 text-center mt-5">Firefighters</h3>
                    <p class="text-md text-black text-center mt-10">
                        Firefighters respond to fires, accidents, and other emergencies to protect 
                        lives, property, and the environment. They rescue people from dangerous situations, 
                        extinguish fires, and provide first aid when needed. Firefighters also work closely with 
                        ambulance teams and other responders to handle emergencies quickly and safely. Through our 
                        real-time emergency platform, they’re dispatched instantly and tracked live to ensure the 
                        fastest possible response.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div class="border border-amber-50 px-10 py-10 rounded-xl bg-amber-50">
                    <h3 class="font-semibold text-2xl text-amber-600 text-center mt-5">Ambulance services and Paramedics</h3>
                    <p class="text-md text-black text-center mt-10">
                        Paramedics and ambulance teams provide urgent medical care during emergencies. They respond quickly to emregncy calls, 
                        treat injuries or illnesses on-site, and transport patients safely to hospitals. Working closely with firefighters and 
                        other responders, paramedics help save lives with fast, expert care. Our platform helps them reach the scene faster with 
                        live tracking and real-time coordination for better outcomes.
                    </p>
                </div>

                <div class="px-10 py-10">
                    <img src="src\assets\Paramedics.jpg"/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;