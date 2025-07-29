import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import searchImages from './Splash.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* {searchImages()} */}
  </StrictMode>
)
