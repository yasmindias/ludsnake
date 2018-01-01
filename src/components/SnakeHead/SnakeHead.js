import { observer } from "mobx-react";
import React, { Component } from "react";

import { width, height } from "Game";
import type { Pos } from "Game";

import head from "./head.png";
import "./SnakeHead.scss";

type Props = {
  speed: number,
  pos: Pos,
  direction: string
};

@observer
export default class SnakeHead extends Component<Props> {
  get angle() {
    const direction = this.props.direction;

    if (direction === "left") return -90;
    if (direction === "down") return 180;
    if (direction === "right") return 90;

    return 0;
  }

  render() {
    const pos = this.props.pos;
    const speed = this.props.speed;

    const style = {
      left: `${pos.x * 100 / width}%`,
      top: `${pos.y * 100 / height}%`,
      transform: `rotate(${this.angle}deg)`,
      transition: `${speed}ms all linear`
    };

    return <img src={head} className="SnakeHead" style={style} alt="" />;
  }
}
