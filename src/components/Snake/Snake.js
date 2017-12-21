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
        <SnakeHead pos={game.head} direction={game.direction} />

        {game.tail.map((piece, index) => <SnakePiece key={index} pos={piece} />)}
      </div>
    );
  }
}
