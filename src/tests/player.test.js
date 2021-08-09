import { CleanPlugin } from "webpack";
import { playerBoard } from "../modules/game";
import Player from "../modules/player";

test('Finds ship in given coords', () => {
    const testPlayer = new Player();
    expect(testPlayer.findShipInCoords(playerBoard, 1, 1)).toBe(playerBoard.grid[0])
})

