import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// Switched to render only the MainMenu for quick testing / demo
import MainMenu from './components/MainMenu.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainMenu/>
  </StrictMode>
)
