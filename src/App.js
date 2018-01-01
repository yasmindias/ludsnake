import { observer } from "mobx-react/custom";
import { observable } from "mobx";
import React, { Component } from "react";

import Game from "./Game";

import Grid from "components/Grid";
import Snake from "components/Snake";
import Fruit from "components/Fruit";
import ScoreBoard from "components/ScoreBoard";

import "./App.scss";

const keys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

@observer
export default class App extends Component {
  @observable game = new Game();

  componentDidMount() {
    window.addEventListener("keydown", event => {
      const keyCode = event.keyCode || event.which;

      if (keyCode === keys.LEFT) this.game.turnLeft();
      else if (keyCode === keys.RIGHT) this.game.turnRight();
      else if (keyCode === keys.UP) this.game.turnUp();
      else if (keyCode === keys.DOWN) this.game.turnDown();
    });
  }

  render() {
    return (
      <div className="App">
        <Grid />
        <Snake game={this.game} />
        <Fruit pos={this.game.fruit} />
        <ScoreBoard game={this.game} />
      </div>
    );
  }
}
