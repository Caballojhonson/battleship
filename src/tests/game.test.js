const game = require('../modules/game');

test('Ship takes damage', () => {
    let testShip = new game.Ship();

    testShip.hit(1);
    testShip.hit(2);
    testShip.hit(3);

    expect(testShip.hitAt).toStrictEqual([1, 2, 3])
})

test('Ship sinks', () => {
    let testShip = new game.Ship('submarine', 2);

    testShip.hit(1);
    testShip.hit(2);

    expect(testShip.sunk).toBe(true)
})

test('Ship object does not break when repeating hits', () => {
    
    let testShip = new game.Ship('submarine', 2);

    testShip.hit(1);
    testShip.hit(1);
    testShip.hit(1);

    testShip.hit(2);
    testShip.hit(2);
    testShip.hit(2);

    expect(testShip.hitAt).toStrictEqual([1, 2])
})

test('Ship gets correct coords across x axis', () => {
    let testShip = new game.Ship('carrier', 2, 2, 'x');

    expect(testShip).toMatchObject({coords: [[2, 2], [3, 2], [4, 2], [5, 2], [6, 2]]})
})

test('Ship gets correct coords across y axis', () => {
    let testShip = new game.Ship('carrier', 2, 2, 'y');

    expect(testShip).toMatchObject({coords: [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6]]})
})

test('Ship gets correct coords across x axis on border edge case', () => {
    let testShip = new game.Ship('carrier', 10, 2, 'x');

    expect(testShip).toMatchObject({coords: [[10, 2], [9, 2], [8, 2], [7, 2], [6, 2]]})
})

test('Ships are placed on gameboard', () => {
    const gameboard = new game.Gameboard();
    gameboard.placeShip('carrier', 2, 2, 'x');

    expect(gameboard.grid[10].hasShip).toBe(false)
    expect(gameboard.grid[11].hasShip).toBe(true)
    expect(gameboard.grid[12].hasShip).toBe(true);
    expect(gameboard.grid[13].hasShip).toBe(true);
    expect(gameboard.grid[14].hasShip).toBe(true)
    expect(gameboard.grid[15].hasShip).toBe(true)
    expect(gameboard.grid[16].hasShip).toBe(false)
    expect(gameboard.grid[17].hasShip).toBe(false);
    expect(gameboard.grid[99].hasShip).toBe(false)

    expect(gameboard.ships[0]).toMatchObject({type:'carrier'})
})

test('Board takes hits on ships and logs missed', () => {
    const gameboard = new game.Gameboard();
    gameboard.placeShip('carrier', 2, 2, 'x');
    gameboard.recieveAttack(2, 2);
    gameboard.recieveAttack(3, 2);

    gameboard.recieveAttack(1, 1)

    expect(gameboard.grid[11].hit).toBe(true);
    expect(gameboard.ships[0].hitAt[0]).toBe(0);
    expect(gameboard.ships[0].hitAt[1]).toBe(1);

    expect(gameboard.grid[0].missed).toBe(true)
    expect(gameboard.grid[11].missed).toBe(false)
})

test('Board declares GameOver', () => {
    const gameboard = new game.Gameboard();
    gameboard.placeShip('submarine', 2, 2, 'x');
    gameboard.recieveAttack(2, 2);

    expect(gameboard.gameoverEval()).toBe(true);
})

test('Board does not declare GameOver randomly', () => {
    const gameboard = new game.Gameboard();
    gameboard.placeShip('submarine', 2, 2, 'x');
    gameboard.recieveAttack(2, 3);
    
    expect(gameboard.gameoverEval()).toBe(false);
})

test ('Ships are randomly generated', () => {
    const gameboard = new game.Gameboard();
    gameboard.randomize();

    expect(gameboard.ships).toHaveLength(7);
});