import { observer } from "mobx-react";
import * as React from "react";
import { Game, width, height } from "Game";

import "./ScoreBoard.scss";

type Props = {
  game: Game,
  level: number
};

@observer
export default class ScoreBoard extends React.Component<Props> {
  render() {
    const game = this.props.game;

    return (
      <div className="ScoreBoard">
        <div className="ScoreBoard__level">Level {game.level}</div>

        <div className="ScoreBoard__score">
          <header className="ScoreBoard__score__header">Score</header>

          <div className="ScoreBoard__score__value">{game.score} points</div>
        </div>
      </div>
    );
  }
}
