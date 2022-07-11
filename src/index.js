import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Reference Page: https://reactjs.org/tutorial/tutorial.html


/*class Square extends React.Component { // class for rendering a button
  constructor(props){ //initialises the state
    super(props);
    this.state = {
      value: null, 
    };
  }

render() {// used to create a visual element 
    return (
      <button 
          className="square" 
          onClick = {() => this.props.onClick()}
          >
            {this.props.value}
      </button>
    );
  }
}*/
function Square(props){ // Same button but now as a function component
return(
  <button className="square" onClick={props.onClick}> 
  {props.value}
  </button>
  );

}
class Board extends React.Component { //used to render 9 sqaures 
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, 
    };
  }
handleClick(i){
  const squares = this.state.squares.slice(); // note: .slice is used to create a copy of the squares array
  if(calculateWinner(squares)|| squares[i]){
    return;
  }

  squares[i] = this.state.xIsNext ? 'X' : 'O'; // alternates between players 1 and 2
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
  });
}

  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
     />
     );
  }

  render() {
    const winner =calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: '+ winner;
    } else{

    status = 'Next player: '+ (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) { //not too sure but i think this is a matrix array
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
