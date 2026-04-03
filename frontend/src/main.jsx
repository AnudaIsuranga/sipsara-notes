import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' // MUST BE IMPORTED

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* THIS MUST WRAP THE APP */}
      <App />
    </AuthProvider>
  </StrictMode>,
)