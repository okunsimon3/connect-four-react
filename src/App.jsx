import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import DropZone from './components/DropZone'

function App() {
  const [turn, setTurn] = useState(1)
  const [winner, setWinner] = useState(0)
  const [dropped, setDropped] = useState([])

  const resetGame = () => {
    setTurn(1)
    setDropped([])
    setWinner(0)
  }

  return (
    <>
      <div className='App'>
        <div className='left-side'>
          <img src='key-map.jpg'></img>
        </div>
        <div className='game-container'>
          {winner === 0 && <h2>Player {turn}'s turn</h2>}
          <DropZone 
            turn={turn}
            setTurn={setTurn}
            dropped={dropped}
            setDropped={setDropped}
            winner={winner}
            setWinner={setWinner}
            reset={resetGame}/>
          <Board />
        </div>
      </div>
    </>
  )
}

export default App
