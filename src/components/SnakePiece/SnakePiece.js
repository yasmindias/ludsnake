import { observer } from "mobx-react";
import React, { Component } from "react";

import { width, height } from "Game";
import type { Pos } from "Game";

import head from "./piece.png";
import "./SnakePiece.scss";

type Props = {
  speed: number,
  pos: Pos
};

@observer
export default class SnakePiece extends Component<Props> {
  render() {
    const speed = this.props.speed;
    const pos = this.props.pos;

    const style = {
      left: `${pos.x * 100 / width}%`,
      top: `${pos.y * 100 / height}%`,
      transition: `${speed}ms all linear`
    };

    return <img src={head} className="SnakePiece" style={style} alt="" />;
  }
}
