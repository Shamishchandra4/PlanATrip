import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ItineraryResponse from './pages/ItineraryResponse'
import ExploreChatRooms from './pages/ExploreChatRooms'
import Chatrooms from './pages/Chatroom'
import CreateChatRoom from './pages/CreateChatRoom'
{window.global = window;}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/itinerary-response' element={<ItineraryResponse/>} />
          <Route path='/chat-room' element={<Chatrooms/>} />
          <Route path='/explore-chat-rooms' element={<ExploreChatRooms/>} />
          <Route path='/create-chat-room' element={<CreateChatRoom/>} />

          <Route path='*' element={<Navigate to="/auth" />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
