// @flow

import { action, observable } from "mobx";

export const width = 15;
export const height = 15;
const direction = "right";

type Pos = {
  x: number,
  y: number
};

type Direction = "left" | "right" | "up" | "down";

export default class Game {
  @observable tail: Pos[];
  @observable head: Pos;
  @observable fruit: boolean;
  @observable isDead: boolean = false;
  @observable direction: Direction;

  constructor() {
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);

    this.tail = [{ x, y }];
    this.head = { x, y };
    this.direction = direction;
    this.randomFruit();

    this.startTimer();
  }

  startTimer() {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(this.move, 500);
  }

  @action
  randomFruit() {
    while (true) {
      const newX = Math.floor(Math.random() * width);
      const newY = Math.floor(Math.random() * height);

      if (!this.collide(newX, newY)) {
        this.fruit = { x: newX, y: newY };
        break;
      }
    }
  }

  @action
  eat() {
    const piece = { x: this.head.x, y: this.head.y };
    this.tail.push(piece);
    this.randomFruit();
  }

  @action.bound
  move() {
    if (this.isDead) return;
    this.startTimer();

    let newX = this.getNewX();
    let newY = this.getNewY();

    if (this.outOfBounds(newX, newY) || this.collide(newX, newY)) {
      this.die();
    } else {
      if (this.fruit.x === newX && this.fruit.y === newY) {
        this.eat();
      }
      this.moveTail();

      this.head.x = newX;
      this.head.y = newY;
    }
  }

  @action
  moveTail() {
    for (let i = this.tail.length - 1; i >= 0; i--) {
      const piece = this.tail[i];

      const { x, y } = i > 0 ? this.tail[i - 1] : this.head;
      piece.x = x;
      piece.y = y;
    }
  }

  outOfBounds(newX, newY) {
    return newX >= width || newY >= height || newX < 0 || newY < 0;
  }

  collide(x, y) {
    if (this.head.x === x && this.head.y === y) return true;

    return this.tail.find(piece => {
      return piece.x === x && piece.y === y;
    });
  }

  @action
  die() {
    this.isDead = true;
    alert("MEOOOW!");
  }

  getNewX() {
    if (this.direction === "left") return this.head.x - 1;
    if (this.direction === "right") return this.head.x + 1;
    return this.head.x;
  }

  getNewY() {
    if (this.direction === "up") return this.head.y - 1;
    if (this.direction === "down") return this.head.y + 1;
    return this.head.y;
  }

  turn(direction) {
    if (!this.canTurnTo(direction)) return;

    this.direction = direction;
    this.move();
  }

  turnLeft() {
    this.turn("left");
  }

  turnRight() {
    this.turn("right");
  }

  turnUp() {
    this.turn("up");
  }

  turnDown() {
    this.turn("down");
  }

  canTurnTo(direction) {
    let x = ["left", "right"];
    let y = ["up", "down"];

    if (direction === this.direction) return true;

    const oppositeX = x.includes(direction) && x.includes(this.direction);
    const oppositeY = y.includes(direction) && y.includes(this.direction);
    return !(oppositeX || oppositeY);
  }
}
