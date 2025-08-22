import { Link } from 'react-router-dom'

const Home = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "VCT Champions 2024: Team Liquid's Dominant Performance",
      excerpt: "Team Liquid showcased exceptional teamwork and strategy in their latest match...",
      category: "Tournaments",
      author: "ProGamer123",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "New Agent 'Harbor' Meta Analysis",
      excerpt: "The latest agent has shaken up the competitive meta. Here's what you need to know...",
      category: "Meta Analysis",
      author: "TacticsMaster",
      date: "2024-01-14"
    },
    {
      id: 3,
      title: "Community Tournament Registration Open",
      excerpt: "Join our monthly community tournament and compete with players worldwide...",
      category: "Community",
      author: "TournamentAdmin",
      date: "2024-01-13"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-red-900 to-red-700 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Valorant Community
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with fellow players, discuss strategies, and stay updated with the latest eSports news
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/volunteer"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Join as Volunteer
          </Link>
          <Link
            to="/community"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Explore Community
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <article key={post.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">By {post.author}</span>
                <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">1,247</div>
          <div className="text-gray-300">Active Members</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">89</div>
          <div className="text-gray-300">Tournaments Hosted</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">15</div>
          <div className="text-gray-300">Volunteers</div>
        </div>
      </section>
    </div>
  )
}

export default Home 