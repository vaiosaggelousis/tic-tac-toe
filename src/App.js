import { useEffect, useState } from 'react';
import './App.css';

function TicTacToe() {
  return(
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function Square(props) {
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Scoreboard({ xWins, oWins, xIsNext, winner }) {
  return(
    <div className="scoreboard">
      <div className="scoreboard-heading">
        <span className="eyebrow">MATCH SCORE</span>
        <h2>Scoreboard</h2>
      </div>
      <div className="score-cards">
        <div className={`score-card score-card-x ${winner === "X" ? "is-winner" : ""}`}>
          <span className="player-mark">X</span>
          <div>
            <span className="player-label">Player one</span>
            <strong className="score-value">{xWins}</strong>
          </div>
          <span className="score-caption">wins</span>
        </div>
        <div className={`score-card score-card-o ${winner === "O" ? "is-winner" : ""}`}>
          <span className="player-mark">O</span>
          <div>
            <span className="player-label">Player two</span>
            <strong className="score-value">{oWins}</strong>
          </div>
          <span className="score-caption">wins</span>
        </div>
      </div>
      <div className="turn-indicator">
        <span className={`turn-dot turn-dot-${winner || (xIsNext ? "x" : "o")}`} />
        {winner === "None" ? "Round draw" : winner ? `${winner} takes the round` : `${xIsNext ? "X" : "O"}'s turn`}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [rounds, setRounds] = useState(0);
  const [xIsNext, setXisNext] = useState(rounds % 2 === 0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if(winner) {
      if(winner === "X") {
        setXWins((prev) => prev + 1);
      } else if(winner === "O"){
        setOWins((prev) => prev + 1);
      }
    }
  }, [winner]);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if(squaresCopy[i] || calculateWinner(squaresCopy)) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXisNext(!xIsNext);
    setRounds(rounds + 1);
  };

  function reset() {
    setSquares(Array(9).fill(null));
    setXisNext(rounds % 2 === 0);
    setWinner(null);
  }

  if(!winner && !squares.includes(null)) {
    setWinner("None");
  } else if(!winner) {
    const newWinner = calculateWinner(squares);
    if(newWinner) {
      setWinner(newWinner);
    }
  }

  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return(
    <>
      <div className="board-panel">
        <div className="status">{status}</div>
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = 3 * row + col;
              return(
                <Square
                  value={squares[index]}
                  onClick={() => handleClick(index)}
                  key={index}
                />
              );
            })}
          </div>
        ))}
        <div className="reset-container">
          {(winner || !squares.includes(null)) && (
            <button className="reset" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>
      <Scoreboard xWins={xWins} oWins={oWins} xIsNext={xIsNext} winner={winner} />
    </>
  );
}

export default TicTacToe;