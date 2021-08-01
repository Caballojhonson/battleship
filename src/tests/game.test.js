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

test('Template', () => {
    expect().to()
})