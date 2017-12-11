import { observer } from "mobx-react";
import React, { Component } from "react";

import { width, height } from "Game";

import head from "./head.png";
import "./SnakeHead.scss";

@observer
export default class SnakeHead extends Component {
  render() {
    const pos = this.props.pos;

    const style = {
      left: `${pos.x * 100 / width}%`,
      top: `${pos.y * 100 / height}%`
    };

    return <img src={head} className="SnakeHead" style={style} alt="" />;
  }
}
