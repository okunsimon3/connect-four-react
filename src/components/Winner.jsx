import './Winner.css'

const Winner = ({winner,reset}) => {
    return (
        <>
          {winner === -1 ? (
            <h2>It's a draw!</h2>
          ) : (
            <h2>Player {winner} has won!</h2>
          )}
          <button className="winner-btn" onClick={reset}>Play Again?</button>
        </>
      );
    };
export default Winner