const Players = () => {
  const players = [
    {
      id: 1,
      name: "Jinggg",
      team: "Paper Rex",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Explosive entry fragger with insane accuracy."
    },
    {
      id: 2,
      name: "Boaster",
      team: "Fnatic",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      description: "In-game leader with excellent strategy and energy."
    },
    {
      id: 3,
      name: "Aspas",
      team: "LOUD",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      description: "Sharp duelist with consistent high KDA."
    },
    {
      id: 4,
      name: "Kaajak",
      team: "FNC",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      description: "Explosive entry fragger with insane accuracy."
    },
    {
      id: 5,
      name: "F0rsaken",
      team: "PRX",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      description: "In-game leader with excellent strategy and energy."
    },
    {
      id: 6,
      name: "Texture",
      team: "GENG",
      image: "https://randomuser.me/api/portraits/men/37.jpg",
      description: "Sharp duelist with consistent high KDA."
    }
  ]

  return (
    <section id="players" className="p-12 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Top Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-gray-100 p-4 rounded shadow w-full flex flex-col items-center"
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-20 h-20 rounded-full mb-2"
            />
            <h3 className="font-bold">{player.name} ({player.team})</h3>
            <p className="text-center">{player.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Players 