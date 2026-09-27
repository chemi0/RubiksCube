const { createSolvedCube, rotateLayer } = require("../src/cube");

// Solved rubiks cube creation (easier for checking than a scrambled one)

test("Creates six solved faces with nine stickers each [3x3 cube]", () => {
    const cube = createSolvedCube();

    const faces = [
        { color: "green", normal: [0, 0, 1], axis: 2, value: 1},
        { color: "blue", normal: [0, 0, -1], axis: 2, value: -1},
        { color: "white", normal: [0, 1, 0], axis: 1, value: 1},
        { color: "yellow", normal: [0, -1, 0], axis: 1, value: -1},
        { color: "red", normal: [1, 0, 0], axis: 0, value: 1},
        { color: "orange", normal: [-1, 0, 0], axis: 0, value: -1},
    ];

    expect(cube).toHaveLength(54);

    for (const face of faces) {
        const stickers = cube.filter (
            (sticker) => sticker.color === face.color
        );

        expect(stickers).toHaveLength(9);

        for (const sticker of stickers) {
            expect(sticker.normal).toEqual(face.normal);
            expect(sticker.position[face.axis]).toBe(face.value);

            for (const coordinate of sticker.position) {
                expect([-1, 0, 1]).toContain(coordinate);
            }
        }

        const positions = stickers.map(
            (sticker) => sticker.position.join(",")
        );

        expect(new Set(positions).size).toBe(9);

    }
});

// X axis

test("Right clockwise (R) moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [1, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [1, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "orange",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
  ];

  const rotated = rotateLayer(cube, "x", 1, -1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [1, 1, -1],
      normal: [0, 1, 0],
    },
    {
      color: "white",
      position: [1, 0, -1],
      normal: [0, 0, -1],
    },
    {
      color: "orange",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
  ]);
});

test("Right counterclockwise (R') moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [1, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [1, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "orange",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
  ];

  const rotated = rotateLayer(cube, "x", 1, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [1, -1, 1],
      normal: [0, -1, 0],
    },
    {
      color: "white",
      position: [1, 0, 1],
      normal: [0, 0, 1],
    },
    {
      color: "orange",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
  ]);
});

test.each([2, -2])("Right half-turn (R2)[both directions] moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "green",
        position: [1, 1, 1],
        normal: [0, 0, 1],
      },
      {
        color: "white",
        position: [1, 1, 0],
        normal: [0, 1, 0],
      },
      {
        color: "orange",
        position: [-1, 0, 0],
        normal: [-1, 0, 0],
      },
    ];

    const rotated = rotateLayer(cube, "x", 1, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "green",
        position: [1, -1, -1],
        normal: [0, 0, -1],
      },
      {
        color: "white",
        position: [1, -1, 0],
        normal: [0, -1, 0],
      },
      {
        color: "orange",
        position: [-1, 0, 0],
        normal: [-1, 0, 0],
      },
    ]);
  }
);

test("Left clockwise (L) moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [-1, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [-1, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "red",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
  ];

  const rotated = rotateLayer(cube, "x", -1, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [-1, -1, 1],
      normal: [0, -1, 0],
    },
    {
      color: "white",
      position: [-1, 0, 1],
      normal: [0, 0, 1],
    },
    {
      color: "red",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
  ]);
});

test("Middle slice clockwise (M)[Follows L direction] moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "red",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
  ];

  const rotated = rotateLayer(cube, "x", 0, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [0, -1, 1],
      normal: [0, -1, 0],
    },
    {
      color: "white",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
    {
      color: "red",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
  ]);
});

test.each([ ["L'", -1, -1], ["L2", -1, 2], ["M'", 0, -1], ["M2", 0, 2], ])("%s moves stickers correctly", (move, layer, quarterTurns) => {
  const cube = [
    {
      color: "green",
      position: [layer, 1, 1],
      normal: [0, 0, 1],
    },
  ];

  const rotated = rotateLayer(cube, "x", layer, quarterTurns);

  const expectedPosition = Math.abs(quarterTurns) === 2 ? [layer, -1, -1] : [layer, 1, -1];

  expect(rotated[0].position).toEqual(expectedPosition);

  const expectedNormal = quarterTurns === -1 ? [0, 1, 0] : [0, 0, -1];

  expect(rotated[0].normal).toEqual(expectedNormal);
});

// Y axis

test("Up clockwise (U) moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [1, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "blue",
      position: [0, 0, -1],
      normal: [0, 0, -1],
    },
  ];

  const rotated = rotateLayer(cube, "y", 1, -1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [-1, 1, 0],
      normal: [-1, 0, 0],
    },
    {
      color: "white",
      position: [0, 1, 1],
      normal: [0, 1, 0],
    },
    {
      color: "blue",
      position: [0, 0, -1],
      normal: [0, 0, -1],
    },
  ]);
});

test("Up counterclockwise (U') moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "blue",
      position: [0, 0, -1],
      normal: [0, 0, -1],
    },
  ];

  const rotated = rotateLayer(cube, "y", 1, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [1, 1, 0],
      normal: [1, 0, 0],
    },
    {
      color: "blue",
      position: [0, 0, -1],
      normal: [0, 0, -1],
    },
  ]);
});

test.each([2, -2])("Up half-turn (U2)[both directions] moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "green",
        position: [0, 1, 1],
        normal: [0, 0, 1],
      },
      {
        color: "blue",
        position: [0, 0, -1],
        normal: [0, 0, -1],
      },
    ];

    const rotated = rotateLayer(cube, "y", 1, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "green",
        position: [0, 1, -1],
        normal: [0, 0, -1],
      },
      {
        color: "blue",
        position: [0, 0, -1],
        normal: [0, 0, -1],
      },
    ]);
  }
);

test("Down clockwise (D) moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, -1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ];

  const rotated = rotateLayer(cube, "y", -1, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [1, -1, 0],
      normal: [1, 0, 0],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ]);
});

test("Down counterclockwise (D') moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, -1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ];

  const rotated = rotateLayer(cube, "y", -1, -1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [-1, -1, 0],
      normal: [-1, 0, 0],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ]);
});

test.each([2, -2])("Down half-turn (D2)[both directions] moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "green",
        position: [0, -1, 1],
        normal: [0, 0, 1],
      },
      {
        color: "white",
        position: [0, 1, 0],
        normal: [0, 1, 0],
      },
    ];

    const rotated = rotateLayer(cube, "y", -1, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "green",
        position: [0, -1, -1],
        normal: [0, 0, -1],
      },
      {
        color: "white",
        position: [0, 1, 0],
        normal: [0, 1, 0],
      },
    ]);
  }
);

test("Equator clockwise (E)[Follows D direction] moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ];

  const rotated = rotateLayer(cube, "y", 0, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ]);
});

test("Equator counterclockwise (E')[Follows D' direction] moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ];

  const rotated = rotateLayer(cube, "y", 0, -1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
  ]);
});

test.each([2, -2])("Equator half-turn (E2)[both directions] moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "green",
        position: [0, 0, 1],
        normal: [0, 0, 1],
      },
      {
        color: "white",
        position: [0, 1, 0],
        normal: [0, 1, 0],
      },
    ];

    const rotated = rotateLayer(cube, "y", 0, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "green",
        position: [0, 0, -1],
        normal: [0, 0, -1],
      },
      {
        color: "white",
        position: [0, 1, 0],
        normal: [0, 1, 0],
      },
    ]);
  }
);

// Z axis
test("Front clockwise (F) moves stickers correctly", () => {
    const cube = [
        {
            color: "green",
            position: [-1, 1, 1],
            normal: [0, 0, 1],
        },
        {
            color: "white",
            position: [0, 1, 1],
            normal: [0, 1, 0],
        },
        {
            color: "blue",
            position: [0, 0, -1],
            normal: [0, 0, -1],
        },
    ];

    const rotated = rotateLayer(cube, "z", 1, -1);

    expect(rotated).toEqual([
        {
            color: "green",
            position: [1, 1, 1],
            normal: [0, 0, 1],
        },
        {
            color: "white",
            position: [1, 0, 1],
            normal: [1, 0, 0],
        },
        {
            color: "blue",
            position: [0, 0, -1],
            normal: [0, 0, -1],
        },
    ]);
});

test("Front counterclockwise (F') moves stickers correctly", () => {
  const cube = [
    {
      color: "green",
      position: [-1, 1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [0, 1, 1],
      normal: [0, 1, 0],
    },
  ];

  const rotated = rotateLayer(cube, "z", 1, 1);

  expect(rotated).toEqual([
    {
      color: "green",
      position: [-1, -1, 1],
      normal: [0, 0, 1],
    },
    {
      color: "white",
      position: [-1, 0, 1],
      normal: [-1, 0, 0],
    },
  ]);
});

test.each([2, -2])("Front half-turn (F2)[both directions] with moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "green",
        position: [-1, 1, 1],
        normal: [0, 0, 1],
      },
      {
        color: "white",
        position: [0, 1, 1],
        normal: [0, 1, 0],
      },
      {
        color: "blue",
        position: [0, 0, -1],
        normal: [0, 0, -1],
      },
    ];

    const rotated = rotateLayer(cube, "z", 1, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "green",
        position: [1, -1, 1],
        normal: [0, 0, 1],
      },
      {
        color: "white",
        position: [0, -1, 1],
        normal: [0, -1, 0],
      },
      {
        color: "blue",
        position: [0, 0, -1],
        normal: [0, 0, -1],
      },
    ]);
  }
);

test("Back clockwise (B) moves stickers correctly", () => {
  const cube = [
    {
      color: "white",
      position: [0, 1, -1],
      normal: [0, 1, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ];

  const rotated = rotateLayer(cube, "z", -1, 1);

  expect(rotated).toEqual([
    {
      color: "white",
      position: [-1, 0, -1],
      normal: [-1, 0, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ]);
});

test("Back counterclockwise (B') moves stickers correctly", () => {
  const cube = [
    {
      color: "white",
      position: [0, 1, -1],
      normal: [0, 1, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ];

  const rotated = rotateLayer(cube, "z", -1, -1);

  expect(rotated).toEqual([
    {
      color: "white",
      position: [1, 0, -1],
      normal: [1, 0, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ]);
});

test.each([2, -2])("Back half-turn (B2) moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "white",
        position: [0, 1, -1],
        normal: [0, 1, 0],
      },
      {
        color: "green",
        position: [0, 0, 1],
        normal: [0, 0, 1],
      },
    ];

    const rotated = rotateLayer(cube, "z", -1, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "white",
        position: [0, -1, -1],
        normal: [0, -1, 0],
      },
      {
        color: "green",
        position: [0, 0, 1],
        normal: [0, 0, 1],
      },
    ]);
  }
);

test("Standing clockwise (S)[Follows F direction] moves stickers correctly", () => {
  const cube = [
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ];

  const rotated = rotateLayer(cube, "z", 0, -1);

  expect(rotated).toEqual([
    {
      color: "white",
      position: [1, 0, 0],
      normal: [1, 0, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ]);
});

test("Standing counterclockwise (S')[Follows F' direction] moves stickers correctly", () => {
  const cube = [
    {
      color: "white",
      position: [0, 1, 0],
      normal: [0, 1, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ];

  const rotated = rotateLayer(cube, "z", 0, 1);

  expect(rotated).toEqual([
    {
      color: "white",
      position: [-1, 0, 0],
      normal: [-1, 0, 0],
    },
    {
      color: "green",
      position: [0, 0, 1],
      normal: [0, 0, 1],
    },
  ]);
});

test.each([2, -2])("Standing half-turn (S2) moves stickers correctly", (quarterTurns) => {
    const cube = [
      {
        color: "white",
        position: [0, 1, 0],
        normal: [0, 1, 0],
      },
      {
        color: "green",
        position: [0, 0, 1],
        normal: [0, 0, 1],
      },
    ];

    const rotated = rotateLayer(cube, "z", 0, quarterTurns);

    expect(rotated).toEqual([
      {
        color: "white",
        position: [0, -1, 0],
        normal: [0, -1, 0],
      },
      {
        color: "green",
        position: [0, 0, 1],
        normal: [0, 0, 1],
      },
    ]);
  }
);