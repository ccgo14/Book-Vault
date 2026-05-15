import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD:Book-Vault/src/main.jsx

=======
import { BrowserRouter } from 'react-router-dom'
import './index.css'
>>>>>>> origin/dev:src/main.jsx
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
