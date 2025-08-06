import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Matches from './components/Matches'
import Agents from './components/Agents'
import Winners from './components/Winners'
import Players from './components/Players'
import News from './components/News'
import VolunteerForm from './components/VolunteerForm'  
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Matches />
      <Agents />
      <Winners />
      <Players />
      <News />
      <VolunteerForm />
      <Footer />
    </div>
  )
}

export default App
