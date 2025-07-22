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
                    <h3 className="text-black font-bold text-2xl text-center">WELLURANCE</h3>
                    <p className="text-white font-bold text-xl">We assure you of your well-being</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div class="px-10 py-10">
                    <img src="src\assets\Firefighters.jpg"/>
                </div>
            
                <div class="border border-gray-400 px-10 py-10 rounded-xl">
                    <h3 class="font-semibold text-xl text-green-600 text-center bg-orange-100">View your expenditure</h3>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl gap-4 mt-5">
                <div class="border border-gray-400 px-10 py-10 rounded-xl">
                    <h3 class="font-semibold text-xl text-green-600 text-center">View your expenditure</h3>
                </div>

                <div class="px-10 py-10">
                    <img src="src\assets\Paramedics.jpg"/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;