import { useState, useEffect } from 'react'

const Agents = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { default: axios } = await import('axios');
        const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
        const data = response.data;
        
        // Get 3 random agents
        const shuffledAgents = data.data.sort(() => 0.5 - Math.random());
        const threeRandomAgents = shuffledAgents.slice(0, 4);
        
        setAgents(threeRandomAgents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <section id="agents" className="p-12 bg-white">
      <h2 className="text-2xl font-semibold mb-4">
        {loading ? 'Loading...' : "Today's top 4 most played agents"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
        {loading ? (
          <div className="text-gray-500 mt-4">Loading agents...</div>
        ) : agents.length > 0 ? (
          agents.map((agent, index) => (
            <div key={agent.uuid} className="bg-gray-100 rounded shadow p-4 flex flex-col items-center">
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
          ))
        ) : (
          <div className="text-gray-500">Failed to load agents</div>
        )}
      </div>
    </section>
  )
}

export default Agents 