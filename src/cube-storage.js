const { createSolvedCube } = require("./cube");
const { applyMove } = require("./moves");

function copyCube(cube) {
    return cube.map((sticker) => ({...sticker, position: [...sticker.position], normal: [...sticker.normal], }));
}

function createCubeStorage() {
    let cube = createSolvedCube();

    return {
        getCube() {
            return copyCube(cube);
        },

        applyMove(move) {
            cube = applyMove(cube, move);
            return copyCube(cube);
        },

        reset() {
            cube = createSolvedCube();
            return copyCube(cube);
        },
    };
}

module.exports = { createCubeStorage };
