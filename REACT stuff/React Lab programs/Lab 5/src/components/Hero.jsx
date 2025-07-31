const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-center h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/1361411.jpeg')"
      }}
    >
      <div className="bg-black/50 p-8 rounded-lg text-center max-w-xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Step into the Arena of Champions
        </h2>
        <p className="text-lg md:text-xl text-gray-100 mb-6">
          Explore the world of esports. Witness history in the making!
        </p>
        <a
          href="#matches"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded shadow-lg transition"
        >
          Explore Now
        </a>
      </div>
    </section>
  )
}

export default Hero 