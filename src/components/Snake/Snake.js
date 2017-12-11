import { observer } from "mobx-react";
import React, { Component } from "react";

import SnakePiece from "components/SnakePiece";
import SnakeHead from "components/SnakeHead";

@observer
export default class Snake extends Component {
  render() {
    const game = this.props.game;

    return (
      <div className="Snake">
        <SnakeHead pos={game.head} />

        {game.tail.map(piece => <SnakePiece key={`${piece.x}/${piece.y}`} pos={piece} />)}
      </div>
    );
  }
}
