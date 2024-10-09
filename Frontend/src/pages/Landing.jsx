import React from 'react';
import logo from "../assets/Take A Trip.jpg";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate(); // Corrected usage of useNavigate

    const handleJoin = () => {
        navigate('/auth'); // This will navigate to the '/auth' route
    };

    return (
        <div>
            {/* Main Landing Section */}
            <div className="relative bg-cover bg-center min-h-screen flex flex-col justify-between text-white" style={{ backgroundImage: "url('https://ecotourism-world.com/wp-content/uploads/2022/04/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpeg')" }}>
                {/* Overlay to dim the background */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Navbar */}
                <nav className="relative flex items-center justify-between p-6">
                    <div className="flex items-center">
                        <img src={logo} alt="Take A Trip Logo" className="w-16 h-16" />
                    </div>
                    <div className="flex space-x-8 text-lg">
                        <a href="#" className="hover:text-gray-300">About Us</a>
                        <a href="#" className="hover:text-gray-300">Join Us</a>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="relative flex-grow flex flex-col justify-center items-center px-6 text-center">
                    <h1 className="text-5xl md:text-9xl font-bold mb-4 poppins-semibold ">TAKE A TRIP</h1>
                    <h2 className="text-xl md:text-2xl mb-6">DISCOVER, CONNECT, TRAVEL SMART</h2>
                    <p className="max-w-2xl text-lg md:text-xl mb-8">
                        Travellers often struggle with planning personalized itineraries using generic travel guides.
                        To solve this, a modern platform offers features like Chat Rooms Around Destinations - for sharing
                        experiences and creating new discussions, access to Local Experts - for insider tips, and updates
                        on Live Local Events. The platform’s Smart Itinerary tool creates tailored travel plans, while Local
                        Persons in Chat Rooms enable direct interactions with locals. A Rewards System also incentivizes
                        participation with points and perks, enhancing the overall experience.
                    </p>
                    <button onClick={handleJoin} className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition">
                        Join Us →
                    </button>
                </div>

            </div>

            {/* Features Section */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-12">Features</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1: Chat Rooms For Destination */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">CHAT Rooms For Destination</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong>Immortalize & Look Able:</strong> Travellers can share experiences, tips, and recommendations, creating a lasting resource for future visitors.
                                </li>
                                <li>
                                    <strong>Creating Chat Rooms:</strong> Users can create new chat rooms dedicated to specific destinations, enabling focused discussions and sharing advice.
                                </li>
                            </ul>
                        </div>

                        {/* Feature 2: Local Expert */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Local Expert</h2>
                            <p>
                                The Local Experts feature connects travelers with knowledgeable locals who provide insider tips, recommendations, and personalized advice about a destination.
                            </p>
                        </div>

                        {/* Feature 3: Rewards */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Rewards</h2>
                            <p>
                                The Rewards feature incentivizes users by offering points for activities like sharing travel experiences or referring others. A ranking system is in place for users who receive the most likes in chat groups.
                            </p>
                        </div>

                        {/* Feature 4: Smart Itinerary */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Smart Itinerary</h2>
                            <p>
                                The Smart Itinerary feature automatically creates personalized travel plans based on your preferences, optimizing routes and suggesting must-see attractions.
                            </p>
                        </div>

                        {/* Feature 5: Live Local Events */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Live Local Events</h2>
                            <p>
                                The Live Local Events feature provides real-time updates on events such as festivals and concerts at your destination, ensuring travelers discover and attend local happenings.
                            </p>
                        </div>

                        {/* Feature 6: Local Person In Chat Room */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Local Person In Chat Room</h2>
                            <p>
                                The Local Person in Chat Room feature connects travelers with locals in real-time, providing personalized advice and recommendations for a more authentic travel experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
