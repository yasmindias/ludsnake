import { observer } from "mobx-react";
import React, { Component } from "react";

import { width, height } from "Game";

import head from "./piece.png";
import "./SnakePiece.scss";

@observer
export default class SnakePiece extends Component {
  render() {
    const pos = this.props.pos;

    const style = {
      left: `${pos.x * 100 / width}%`,
      top: `${pos.y * 100 / height}%`
    };

    return <img src={head} className="SnakePiece" style={style} alt="" />;
  }
}
