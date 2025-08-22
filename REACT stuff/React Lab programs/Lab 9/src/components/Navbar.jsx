import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-red-500 my-auto p-4 md:p-12 flex flex-wrap md:flex-nowrap justify-between items-center w-screen">
      <svg
        width="100"
        height="100"
        viewBox="0 0 50 50"
        fill="none"
        className="rounded-full"
      >
        <polygon points="25,5 45,45 5,45" fill="#e11d48" />
        <polygon points="25,12 40,42 10,42" fill="#f59e42" />
        <polygon points="25,20 35,40 15,40" fill="#fff" />
      </svg>
      
      <div className="flex justify-center w-full md:w-auto">
        <h1 className="text-white font-bold italic text-2xl">Ranked.GG</h1>
      </div>
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white text-3xl focus:outline-none ml-auto"
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <nav className={`flex-col md:flex-row flex gap-4 justify-between absolute md:static top-20 left-0 w-full md:w-auto bg-red-500 md:bg-transparent z-10 md:flex md:items-center ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
        <a href="#matches" className="hover:underline text-white flex items-center gap-2">
          <i className="fas fa-trophy"></i> Matches
        </a>
        <a href="#teams" className="hover:underline text-white flex items-center gap-2">
          <i className="fas fa-users"></i> Teams
        </a>
        <a href="#tournaments" className="hover:underline text-white flex items-center gap-2">
          <i className="fas fa-medal"></i> Tournaments
        </a>
      </nav>
    </header>
  )
}

export default Navbar 