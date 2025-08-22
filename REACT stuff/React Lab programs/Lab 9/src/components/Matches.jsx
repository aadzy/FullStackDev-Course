import { useState } from 'react'

const Matches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  const matches = [
    { id: 1, team1: "FPX", team2: "EDG" },
    { id: 2, team1: "DRX", team2: "ZETA" },
    { id: 3, team1: "FNC", team2: "NAVI" },
    { id: 4, team1: "EG", team2: "LOUD" },
    { id: 5, team1: "PRX", team2: "G2" }
  ]

  const openModal = (match) => {
    setSelectedMatch(match)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMatch(null)
  }

  return (
    <>
      <section id="matches" className="p-12 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Ongoing Matches:</h2>
        <div className="flex justify-between flex-wrap gap-4">
          {matches.map((match) => (
            <div 
              key={match.id}
              className="bg-white rounded-lg shadow p-6 flex-1 min-w-[200px] max-w-xs hover:bg-red-100 transition flex flex-col items-center"
            >
              <span className="text-xl font-bold mb-2">{match.team1} vs {match.team2}</span>
              <button 
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => openModal(match)}
              >
                View Match
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedMatch && `${selectedMatch.team1} vs ${selectedMatch.team2}`}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Dummy YouTube Stream Container */}
            <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-6xl mb-4">📺</div>
                <h4 className="text-xl font-semibold mb-2">Live Stream</h4>
                <p className="text-gray-600">YouTube stream would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Matches 