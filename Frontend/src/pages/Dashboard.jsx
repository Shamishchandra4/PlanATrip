import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import hyd from "../assets/hyd.jpg"
import udipi from "../assets/udipi.jpg"
import SC from "../assets/SC.jpg"
import login from "../assets/login.jpg"
import { Itinerary } from '@/utils/constants';
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import LiveLocalEvents from '@/components/parts/LiveLocalEvents';
import RewardsCard from '@/components/parts/RewardsCard';


const Dashboard = () => {
    const navigate=useNavigate()
    const preferences = [
        { value: "adventure", label: "Adventure" },
        { value: "relaxation", label: "Relaxation" },
        { value: "cultural", label: "Cultural" },
        { value: "wildlife", label: "Wildlife" },
        { value: "nature", label: "Nature" },
        { value: "historical", label: "Historical" },
        { value: "beach", label: "Beach" },
        { value: "cruise", label: "Cruise" },
        { value: "luxury", label: "Luxury" },
        { value: "spiritual", label: "Spiritual" }
    ];
    const destinations = [
        { name: "Delhi", description: "Vibrant" },
        { name: "Hyderabad", description: "Happening" },
        { name: "Manali", description: "Serene" }
    ];
    const [itineraryData, setItineraryData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        preference: '',
        budget: '',
        travelers: '',
        interests: '',
    });
    
    const handleItinerary = async () => {
        try {
            const response = await apiClient.post(Itinerary, itineraryData, { withCredentials: true });
            console.log(response);
            if (response.status === 201) {
                navigate("/itinerary-response")
            }
    
        } catch (error) {
            console.log("Error during itinerary creation:", error);
            toast.error("Itinerary creation failed!");
        }
    };
    


    const experiences = [
        {
            id: 1,
            title: "Hyderabad Street Food Tour ",
            description: "Explore the city's hidden food gems through the eyes of a local.",
            imageUrl: hyd,
            localGuideName: "Om Naidu",
            localGuideImage: login,
        },
        {
            id: 2,
            title: "Udipi BackWaters",
            description: "Witness traditional dance performances in an intimate local setting.",
            imageUrl: udipi,
            localGuideName: "Shamish Chandra",
            localGuideImage: SC,
        },
    ];
  
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setItineraryData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };



    return (
        <div className="min-h-screen poppins-medium bg-[#151518] text-[#EDEDEE]  font-poppins">
            <header className="bg-[#09090B] px-6 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold poppins-semibold  ">
                    <Link to="/">TravelEazy</Link>
                </div>

                <div className="flex-grow mx-4">
                    {/* <input
                        type="text"
                        className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-md placeholder-gray-400 focus:outline-none"
                        placeholder="Search destinations, chat rooms, events..."
                    /> */}
                </div>

                <nav className="space-x-6 text-lg poppins-medium">
                    <Link to="/chat-rooms" className="hover:text-gray-400">Chat Rooms</Link>
                    <Link to="/local-experiences" className="hover:text-gray-400">Local Experiences</Link>
                    <Link to="/itinerary" className="hover:text-gray-400">Smart Itinerary</Link>
                    <Link to="/rewards" className="hover:text-gray-400">Rewards</Link>
                    <Link to="/events" className="hover:text-gray-400">Live Local Events</Link>
                    <Link to="/locals" className="hover:text-gray-400">Meet Locals</Link>
                    <Link to="/profile" className="hover:text-gray-400">My Profile</Link>
                </nav>


            </header>

            <main className="p-8">
                <section className="mb-8 poppins-semibold ">
                    <h1 className="text-3xl font-bold text-white">Welcome  [User]!</h1>
                    <p className="text-gray-400">Here's your travel dashboard overview:</p>
                </section>

                {/* Dashboard Features */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-[#1f1f1f] p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Chat Rooms</h2>
                        <p className="text-gray-400 mb-6">Join or Create destination chat rooms.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {destinations.map((destination) => (
                                <div key={destination.name} className="bg-[#292929] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <h3 className="text-lg font-bold text-white">{destination.name}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{destination.description}</p>
                                </div>
                            ))}
                        </div>
                        <Link to="/explore-chat-rooms" className="text-blue-500 hover:underline mt-4 block">Explore More Chat Rooms</Link>
                    </div>


                    {/* Local Experiences */}
                    <div className="bg-[#1f1f1f] p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Local Experiences</h2>
                        <p className="text-gray-400 mb-6">Discover authentic activities and experiences through the eyes of locals.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {experiences.map((experience) => (
                                <div key={experience.title} className="bg-[#292929] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <img src={experience.imageUrl} alt={experience.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
                                    <h3 className="text-lg font-bold text-white">{experience.title}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{experience.description}</p>
                                    <div className="mt-4 flex items-center">
                                        <img src={experience.localGuideImage} alt={experience.localGuideName} className="h-8 w-8 rounded-full mr-2" />
                                        <span className="text-gray-400 text-sm">By {experience.localGuideName}</span>
                                    </div>
                                    <Link to={`/experience/${experience.id}`} className="text-blue-500 hover:underline mt-4 block">Learn More</Link>
                                </div>
                            ))}
                        </div>

                        <Link to="/local-experiences" className="text-blue-500 hover:underline mt-6 block">Explore More Experiences</Link>
                    </div>


                    {/* Smart Itinerary */}
                    <div className="bg-[#1f1f1f] p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-white">Create Your Smart AI Itinerary</h2>

                        <div className="mb-4">
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-400 mb-2">
                                Destination
                            </label>
                            <input
                                type="text"
                                id="destination"
                                placeholder="Enter your destination like Hyderabad"
                                value={itineraryData.destination}
                                onChange={handleInputChange} // Update here
                                className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                            />
                        </div>

                        {/* Dates */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-400 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate" // Change id here to match the state
                                    value={itineraryData.startDate} // Update here
                                    onChange={handleInputChange} // Update here
                                    className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                                    style={{ appearance: 'none' }}
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-400 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate" // Change id here to match the state
                                    value={itineraryData.endDate} // Update here
                                    onChange={handleInputChange} // Update here
                                    className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                                    style={{ appearance: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Travel Preferences */}
                        <div className="mb-4">
                            <label htmlFor="preference" className="block text-sm font-medium text-gray-400 mb-2">
                                Travel Preferences
                            </label>
                            <select
                                id="preference" // Change id here to match the state
                                value={itineraryData.preference} // Update here
                                onChange={handleInputChange} // Update here
                                className="w-full p-3 rounded-md bg-[#2b2b2b] text-white"
                            >
                                {preferences.map((preference) => (
                                    <option key={preference.value} value={preference.value}>
                                        {preference.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Budget */}
                        <div className="mb-4">
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-400 mb-2">
                                Budget
                            </label>
                            <input
                                type="number"
                                id="budget" // Change id here to match the state
                                value={itineraryData.budget} // Update here
                                onChange={handleInputChange} // Update here
                                placeholder="Enter your budget per traveler"
                                className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                            />
                        </div>

                        {/* Number of Travelers */}
                        <div className="mb-4">
                            <label htmlFor="travelers" className="block text-sm font-medium text-gray-400 mb-2">
                                Number of Travelers
                            </label>
                            <input
                                type="number"
                                id="travelers" // Change id here to match the state
                                value={itineraryData.travelers} // Update here
                                onChange={handleInputChange} // Update here
                                placeholder="Enter number of travelers"
                                className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                            />
                        </div>

                        {/* Interests */}
                        <div className="mb-6">
                            <label htmlFor="interests" className="block text-sm font-medium text-gray-400 mb-2">
                                Interests (Optional)
                            </label>
                            <textarea
                                id="interests" // Change id here to match the state
                                value={itineraryData.interests} // Update here
                                onChange={handleInputChange} // Update here
                                placeholder="E.g., hiking, museums, beaches"
                                className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500 h-24"
                            />
                        </div>


                        {/* Make Itinerary Button */}
                        <div className="flex justify-center">
                            <button onClick={handleItinerary} className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                                Make Itinerary
                            </button>
                        </div>
                    </div>


                    {/* Rewards */}
                    {/* <div className="bg-[#1f1f1f] p-6 rounded-lg">
                        <h2 className="text-xl font-semibold">Rewards</h2>
                        <p className="text-gray-400">Check your points and redeem rewards.</p>
                        <Link to="/rewards" className="text-blue-500 hover:underline">View Rewards</Link>
                    </div> */}
                    <RewardsCard/>

                    {/* Live Local Events */}
                    {/*<div className="bg-[#1f1f1f] p-6 rounded-lg">
                        <h2 className="text-xl font-semibold">Live Local Events</h2>
                        <p className="text-gray-400">Join events happening near you.</p>
                        <Link to="/events" className="text-blue-500 hover:underline">Browse Events</Link>
                    </div>*/}
                    <LiveLocalEvents/>

                    {/* Meet Locals */}
                    <div className="bg-[#1f1f1f] p-6 rounded-lg">
                        <h2 className="text-xl font-semibold">Meet Locals</h2>
                        <p className="text-gray-400">Chat with locals for guidance.</p>
                        <Link to="/locals" className="text-blue-500 hover:underline">Meet Locals</Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
