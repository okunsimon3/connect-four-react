import { useEffect, useState } from 'react'
import './DropZone.css'
import { size,rows,cols } from '../constants/constants'
import ActiveCoin from './ActiveCoin'
import Winner from './Winner'

const DropZone = ({ turn, setTurn, dropped, setDropped, winner, setWinner, reset }) =>  {

    const findWinner = () => {
        // Change in row/column
        const directions = [
            { dx: 0, dy: 1 },   // horizontal → 
            { dx: 1, dy: 0 },   // vertical ↓ 
            { dx: 1, dy: 1 },   // diagonal ↘
            { dx: 1, dy: -1 },  // diagonal ↗
        ];
        // Check for Sequences of 4 in a row
        const check = (playerMoves, x, y) => {
            // Check directions for 3 additional matching coins
            return directions.some(({ dx, dy }) => {
                return (
                    // loop through playerMoves array and checks for certain positions based on direction
                    playerMoves.find(m => m.x === x + dx && m.y === y + dy) &&
                    playerMoves.find(m => m.x === x + 2 * dx && m.y === y + 2 * dy) &&
                    playerMoves.find(m => m.x === x + 3 * dx && m.y === y + 3 * dy)
                );
            });
        };

        // filter through array for win check
        const p1 = dropped.filter(d => d.player === 1);
        const p2 = dropped.filter(d => d.player === 2);

        // Check for every coin p1 dropped
        for (let { x, y } of p1) {
            if (check(p1, x, y)) {
                setWinner(1);
                return;
            }
        }
        // Check for every coin p2 dropped
        for (let { x, y } of p2) {
            if (check(p2, x, y)) {
                setWinner(2);
                return;
            }
        }
    };


    // It's a Draw
    useEffect(() => {
        if(dropped.length === rows*cols)
            setWinner(-1)
        findWinner()
    }, [dropped.length])

    // Console.log check
    useEffect(() => console.log(winner), [winner])

    return <div className='drop-zone'>
        {/* map over dropped array */}
        {dropped.map((m,i) =>
            <div key={i}
                className={`p${m.player}`}
                // drop coin movement
                style={{transform: `translate(${m.y*size}px,${m.x*size+150}px)`}}
            />
        )}
        

        {
            // Show winner component if possible
            winner ? <Winner winner={winner} reset={reset} />:
            // keep playing
            <ActiveCoin 
            turn={turn}
            dropped={dropped}
            setDropped={setDropped}
            setTurn={setTurn}
        />
        }


    </div>
}

export default DropZone