import { useState } from 'react'
import Game from './components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Game></Game>
    </>
  )
}

export default App
