import { useState } from 'react'
import './App.css'
import ListaCompras from './ListaCompras'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListaCompras/>
    </>
  )
}

export default App
