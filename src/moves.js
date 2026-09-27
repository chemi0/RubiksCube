const { rotateLayer } = require("./cube");

const moves = {
  U:  { axis: "y", layers: [1],     clockwise: -1 },
  D:  { axis: "y", layers: [-1],    clockwise: 1 },
  R:  { axis: "x", layers: [1],     clockwise: -1 },
  L:  { axis: "x", layers: [-1],    clockwise: 1 },
  F:  { axis: "z", layers: [1],     clockwise: -1 },
  B:  { axis: "z", layers: [-1],    clockwise: 1 },
  M:  { axis: "x", layers: [0],     clockwise: 1 },
  E:  { axis: "y", layers: [0],     clockwise: 1 },
  S:  { axis: "z", layers: [0],     clockwise: -1 },

  Uw: { axis: "y", layers: [1, 0],  clockwise: -1 },
  Dw: { axis: "y", layers: [-1, 0], clockwise: 1 },
  Rw: { axis: "x", layers: [1, 0],  clockwise: -1 },
  Lw: { axis: "x", layers: [-1, 0], clockwise: 1 },
  Fw: { axis: "z", layers: [1, 0],  clockwise: -1 },
  Bw: { axis: "z", layers: [-1, 0], clockwise: 1 },
};

function applyMove(cube, move) {
    let normalizedMove = move;

    if (typeof move === "string" && /^[udrlfb]['2]?$/.test(move)) {
        normalizedMove = `${move[0].toUpperCase()}w${move.slice(1)}`; // Lowercase handling
    }

    const match = typeof normalizedMove === "string" && /^([UDRLFBMES])(w?)(['2]?)$/.exec(normalizedMove); // Valid notations of moves

    if (!match) {
        throw new Error ("Unsupported move");
    }

    const [, face, wide, modifier] = match;
    const definition = moves[`${face}${wide}`]; // Move definition lookup

    if (!definition) {
        throw new Error ("Unsupported move");
    }

    let quarterTurns = definition.clockwise;

    if (modifier === "'") {
        quarterTurns *= -1; // Move primed
    } else if (modifier === "2") {
        quarterTurns *= 2; // Move doubled
    }

    // reduce applies same rotation to every layer for double (wide, Uw f.e. ) layer rotations
    return definition.layers.reduce((state, layer) => rotateLayer(state, definition.axis, layer, quarterTurns), cube);
}

module.exports = { applyMove };