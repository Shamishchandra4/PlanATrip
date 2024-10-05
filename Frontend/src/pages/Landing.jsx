import React from 'react';
import starrySky from '../assets/bg.jpg'; // Adjust this path to your image
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const navigate=useNavigate()
  const handleJoin=()=>{
    navigate('/auth')
  }
  return (
    <div className="relative h-screen flex items-center justify-center text-center">

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${starrySky})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      


      <div className="relative text-center flex flex-col items-center justify-center z-10 p-6 rounded-md max-w-md mx-auto">
       
        <h1 className="text-[150px] poppins-semibold  font-bold text-white mb-4">
          TravelEazy
        </h1>

        <p className="text-xl text-gray-200 mb-6">
          Discover. Connect. Travel Smarter.
        </p>
        <button onClick={handleJoin}>Join Us</button>


      </div>
    </div>
  );
};

export default Landing;
