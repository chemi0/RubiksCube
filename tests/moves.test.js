const { createSolvedCube, rotateLayer } = require("../src/cube");
const { applyMove } = require("../src/moves");

test.each([
    ["U", "y", 1, -1],
    ["D", "y", -1, 1],
    ["R", "x", 1, -1],
    ["L", "x", -1, 1],
    ["F", "z", 1, -1],
    ["B", "z", -1, 1],
    ["M", "x", 0, 1],
    ["E", "y", 0, 1],
    ["S", "z", 0, -1],
    ])("%s maps to the correct layer turn", (move, axis, layer, quarterTurns) => {
    const cube = createSolvedCube();

    expect(applyMove(cube, move)).toEqual(rotateLayer(cube, axis, layer, quarterTurns));
});

test.each([
    ["U'", "y", 1, 1],
    ["R'", "x", 1, 1],
    ["M'", "x", 0, -1],
    ["F2", "z", 1, -2],
    ])("%s handles its modifier", (move, axis, layer, quarterTurns) => {
    const cube = createSolvedCube();

    expect(applyMove(cube, move)).toEqual(rotateLayer(cube, axis, layer, quarterTurns));
});

test("rejects an unsupported move", () => {
    expect(() => applyMove(createSolvedCube(), "Q")).toThrow("Unsupported move");
});

test.each([
    ["Uw", "y", [1, 0], -1],
    ["Dw", "y", [-1, 0], 1],
    ["Rw", "x", [1, 0], -1],
    ["Lw", "x", [-1, 0], 1],
    ["Fw", "z", [1, 0], -1],
    ["Bw", "z", [-1, 0], 1],
    ])("%s rotates both of its layers", (move, axis, layers, quarterTurns) => {
    const cube = createSolvedCube();

    const expected = layers.reduce((state, layer) => rotateLayer(state, axis, layer, quarterTurns), cube);

    expect(applyMove(cube, move)).toEqual(expected);
});

test.each([
    ["u", "Uw"],
    ["d", "Dw"],
    ["r", "Rw"],
    ["l", "Lw"],
    ["f", "Fw"],
    ["b", "Bw"],
    ])("%s is an alias for %s", (lowercaseMove, wideMove) => {
    const cube = createSolvedCube();

    expect(applyMove(cube, lowercaseMove)).toEqual(applyMove(cube, wideMove));
});

test("Uw' reverses the direction on both layers", () => {
    const cube = createSolvedCube();

    const expected = [1, 0].reduce(
        (state, layer) => rotateLayer(state, "y", layer, 1), cube);

    expect(applyMove(cube, "Uw'")).toEqual(expected);
});