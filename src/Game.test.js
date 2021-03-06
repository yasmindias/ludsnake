// @flow

import Game, { width, height } from "./Game";

describe("Game", () => {
  let game: Game;

  describe("#construct", () => {
    beforeAll(() => {
      game = new Game();
    });

    it("sets the head position", () => {
      expect(game.head.x).not.toBeNull();
      expect(game.head.y).not.toBeNull();
    });

    it("creates a tail with a piece pos equals to head", () => {
      const piece = game.tail[0];
      expect(piece.x).toEqual(game.head.x);
      expect(piece.y).toEqual(game.head.y);
    });

    it("sets a direction", () => {
      expect(game.direction).toBeTruthy();
    });

    it("sets the fruit position", () => {
      expect(game.fruit.x).not.toBeNull();
      expect(game.fruit.y).not.toBeNull();
    });

    it("defines that it is not dead", () => {
      expect(game.isDead).toBeFalsy();
    });
  });

  describe("#collide", () => {
    beforeAll(() => {
      game = new Game();
      game.head = { x: 0, y: 0 };
      game.tail = [{ x: 1, y: 0 }];
    });

    it("collides with head", () => {
      expect(game.collide(game.head.x, game.head.y)).toBeTruthy();
    });

    it("collides with tail", () => {
      const piece = game.tail[0];
      expect(game.collide(piece.x, piece.y)).toBeTruthy();
    });

    it("does not collide outside of head and tail", () => {
      expect(game.collide(6, 9)).toBeFalsy();
    });
  });

  describe("#outOfBounds", () => {
    beforeAll(() => {
      game = new Game();
    });

    it("is out of bounds to the left", () => {
      expect(game.outOfBounds(-1, 0)).toBeTruthy();
    });

    it("is out of bounds to the top", () => {
      expect(game.outOfBounds(0, -1)).toBeTruthy();
    });

    it("is out of bounds to the right", () => {
      expect(game.outOfBounds(width, 0)).toBeTruthy();
    });

    it("is out of bounds to the bottom", () => {
      expect(game.outOfBounds(0, height)).toBeTruthy();
    });
  });
});
