import { useEffect, useState } from "react"


const ActiveCoin = ({turn,dropped,setDropped,setTurn}) => {

    const [column,setColumn] = useState(2)
    const [row, setRow] = useState()

    // Keyboard controls
    const handleKeyDown = e => {
        // left arrow
        if(e.keyCode === 37 && column > 0)
            setColumn(column-1)
        // right arrow
        else if (e.keyCode === 39) {
            if (column === undefined)
                setColumn(1)
            else if(column < 6)
            setColumn(column+1)
        }
        // enter
        else if (e.keyCode === 13) {
            // doesn't drop if top row is filled
            if (dropped.find(drop => drop.x === 0 && drop.y === (column||0))) {
                return
            }

            const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length

            setRow(len)
            setTimeout(() => {
                //adds new index item in dropped array
                setDropped([
                    ...dropped,
                    {x: len, y:column || 0, player: turn}
                ])
                // change the turn
                setTurn(turn === 1 ? 2 : 1)
            }, 500)
        }
    }

    // reset coin position when turn changes
    useEffect(() => {
        setColumn(0)
        setRow()
    }, [turn])
    // keyboard event liseteners
    useEffect(() => {
        document.addEventListener('keyup',handleKeyDown,false)

        return () => document.removeEventListener('keyup',handleKeyDown)
    })

    return <div className={`active p${turn} column-${column||'-'} row-${row===undefined ? '-' : row}`} />
}

export default ActiveCoin