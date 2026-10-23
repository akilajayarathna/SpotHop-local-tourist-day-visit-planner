import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import PlaceDetails from './pages/PlaceDetails.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/places' element={<App />} />
      <Route path='/places/:slug' element={<PlaceDetails />} />
    </Routes>
  </BrowserRouter>
)
