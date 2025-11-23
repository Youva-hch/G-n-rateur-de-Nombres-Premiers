import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Root } from './routes/__root'
import { Index } from './routes/index'
import { Primes } from './routes/primes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="primes" element={<Primes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
