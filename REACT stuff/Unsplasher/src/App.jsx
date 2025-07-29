import { useState } from 'react'
import './App.css'
import SearchImages from './Splash.jsx'
import SearchBar from './SearchBar.jsx'
import ImageContainer from './ImageContainer.jsx'

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    setLoading(true);
    const results = await SearchImages(term);
    setImages(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Unsplasher</h1>
      <SearchBar onSearch={handleSearch} />
      <ImageContainer images={images} loading={loading} />
    </div>
  )
}

export default App
