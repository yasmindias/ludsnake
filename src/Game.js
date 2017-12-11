import { action, observable } from "mobx";

export const width = 15;
export const height = 15;
const direction = "right";

export default class Game {
  @observable tail;
  @observable head;
  @observable isDead;
  @observable fruit;

  constructor() {
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);

    this.tail = [{ x, y }];
    this.head = { x, y };
    this.direction = direction;
    this.randomFruit();
    this.isDead = false;

    this.startTimer();
  }

  @action
  startTimer() {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(this.move, 500);
  }

  @action
  randomFruit() {
    let newx = Math.floor(Math.random() * width);
    let newy = Math.floor(Math.random() * height);

    while(this.collide(newx, newy)){
        newx = Math.floor(Math.random() * width);
        newy = Math.floor(Math.random() * height);
    }
    this.fruit = {x: newx, y: newy};
  }

  @action
  eat() {
    let piece = { x: this.head.x, y: this.head.y };
    this.tail.unshift(piece);
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
      } else {
        let piece = this.tail.pop();
        piece.x = this.head.x;
        piece.y = this.head.y;
        this.tail.unshift(piece);
      }

      this.head.x = newX;
      this.head.y = newY;
    }
  }

  outOfBounds(newX, newY) {
    return newX >= width || newY >= height || newX < 0 || newY < 0;
  }

  collide(x, y) {
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
