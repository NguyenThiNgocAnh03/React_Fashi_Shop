import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import {App, App2,App3, App4, Giaodien} from './components/app/App.jsx'
import {App} from './components/app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <App2 />
    <App3 />
    <App4 />
    <Giaodien /> */}
  </StrictMode>,
)
