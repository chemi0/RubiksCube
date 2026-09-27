const { createSolvedCube } = require("../src/cube");
const { applyMove } = require("../src/moves");
const { createCubeStorage } = require("../src/cube-storage");

test ("Start with a solved cube", () => {
    const store = createCubeStorage();
    expect(store.getCube()).toEqual(createSolvedCube());
});

test("Keep a move in state for later reads", () => {
  const store = createCubeStorage();
  const startingCube = store.getCube();

  store.applyMove("R");

  expect(store.getCube()).toEqual(applyMove(startingCube, "R"));
});

test("Reset restores the solved cube", () => {
  const store = createCubeStorage();

  store.applyMove("R");
  store.reset();

  expect(store.getCube()).toEqual(createSolvedCube());
});

test("A caller cannot change the stored state through a returned cube", () => {
  const store = createCubeStorage();
  const returnedCube = store.getCube();

  returnedCube[0].color = "purple";
  returnedCube[0].position[0] = 99;

  expect(store.getCube()).toEqual(createSolvedCube());
});