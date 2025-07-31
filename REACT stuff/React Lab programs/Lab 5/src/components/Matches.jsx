const Matches = () => {
  const matches = [
    { id: 1, team1: "FPX", team2: "EDG" },
    { id: 2, team1: "DRX", team2: "ZETA" },
    { id: 3, team1: "FNC", team2: "NAVI" },
    { id: 4, team1: "EG", team2: "LOUD" },
    { id: 5, team1: "PRX", team2: "G2" }
  ]

  return (
    <section id="matches" className="p-12 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Ongoing Matches:</h2>
      <div className="flex justify-between flex-wrap gap-4">
        {matches.map((match) => (
          <a 
            key={match.id}
            href="#matches" 
            className="bg-white rounded-lg shadow p-6 flex-1 min-w-[200px] max-w-xs hover:bg-red-100 transition flex flex-col items-center"
          >
            <span className="text-xl font-bold mb-2">{match.team1} vs {match.team2}</span>
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              View Match
            </button>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Matches 