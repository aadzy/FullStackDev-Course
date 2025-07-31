import { useState, useEffect } from 'react'

const Agents = () => {
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
      .then(response => response.json())
      .then(data => {
        const randomAgent = data.data[Math.floor(Math.random() * data.data.length)]
        setAgent(randomAgent)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching agent:', error)
        setLoading(false)
      })
  }, [])

  return (
    <section id="agents" className="p-12 bg-white">
      <h2 className="text-2xl font-semibold mb-4">
        {loading ? 'Valorant Agents' : 'Agent of the Day'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-gray-500 mt-4">Loading agents...</div>
        ) : agent ? (
          <div className="bg-gray-100 rounded shadow p-4 flex flex-col items-center">
            <img 
              src={agent.displayIcon} 
              alt={agent.displayName} 
              className="w-20 h-20 mb-2 rounded-full object-cover" 
            />
            <h3 className="font-bold mb-1">{agent.displayName}</h3>
            <p className="text-sm text-gray-700 text-center">
              {agent.description || 'No description available'}
            </p>
          </div>
        ) : (
          <div className="text-gray-500">Failed to load agent</div>
        )}
      </div>
    </section>
  )
}

export default Agents 