const { createSolvedCube } = require("../src/cube");
const { toFaceGrids } = require("../src/cube-serializer");

test("Return six 3x3 face grids of a solved cube", () => {
    const faces = toFaceGrids(createSolvedCube());

    expect(Object.keys(faces)).toEqual(["U", "D", "F", "B", "L", "R"]);

    const expectedColors = {
        U: "white",
        D: "yellow",
        F: "green",
        B: "blue",
        L: "orange",
        R: "red",
    };

    for (const [face, color] of Object.entries(expectedColors)) {
        expect(faces[face]).toHaveLength(3);

        for (const row of faces[face]) {
        expect(row).toHaveLength(3);
        expect(row).toEqual([color, color, color]);
        }
    }
});

test("Order the front face from top-left to bottom-right", () => {
  const cube = [];

  for (const y of [1, 0, -1]) {
    for (const x of [-1, 0, 1]) {
      cube.push({
        color: `${x},${y}`,
        position: [x, y, 1],
        normal: [0, 0, 1],
      });
    }
  }

  const faces = toFaceGrids(cube);

  expect(faces.F).toEqual([
    ["-1,1", "0,1", "1,1"],
    ["-1,0", "0,0", "1,0"],
    ["-1,-1", "0,-1", "1,-1"],
  ]);
});