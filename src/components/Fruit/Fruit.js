import { observer } from "mobx-react";
import React, { Component } from "react";

import { width, height } from "Game";

import fruit from "./fruit.png";

@observer
export default class Fruit extends Component {
  render() {
    const pos = this.props.pos;

    const style = {
      left: `${pos.x * 100 / width}%`,
      top: `${pos.y * 100 / height}%`
    };

    return <img src={fruit} className="Fruit" style={style} alt="" />;
  }
}
