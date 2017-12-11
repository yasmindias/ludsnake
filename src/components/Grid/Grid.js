import { observer } from "mobx-react";
import React, { Component } from "react";
import { width, height } from "Game";

import "./Grid.scss";

@observer
export default class Grid extends Component {
  render() {
    return (
      <div className="Grid">
        {this.renderRows()}
        {this.renderColumns()}
      </div>
    );
  }

  renderRows() {
    const columns = [];

    for (let i = 1; i < height; i++) {
      const style = {
        top: `${i * 100 / height}%`
      };

      columns.push(<div key={i} className="Grid__row" style={style} />);
    }

    return columns;
  }

  renderColumns() {
    const columns = [];

    for (let i = 1; i < width; i++) {
      const style = {
        left: `${i * 100 / width}%`
      };

      columns.push(<div key={i} className="Grid__column" style={style} />);
    }

    return columns;
  }
}
