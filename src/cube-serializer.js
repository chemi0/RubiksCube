const faceForNormal = { // Which face the sticker belongs
    "0,1,0": "U",
    "0,-1,0": "D",
    "0,0,1": "F",
    "0,0,-1": "B",
    "-1,0,0": "L",
    "1,0,0": "R",
};

const gridPositionForFace = { // Where the sticker goes with the face's grid
    U: (position) => [position[2] + 1, position[0] + 1],
    D: (position) => [1 - position[2], position[0] + 1],
    F: (position) => [1 - position[1], position[0] + 1],
    B: (position) => [1 - position[1], 1 - position[0]],
    L: (position) => [1 - position[1], position[2] + 1],
    R: (position) => [1 - position[1], 1 - position[2]],
};

function toFaceGrids(cube) { // 3x3 Grid instead of the JSON with the data of each sticker just to make the visibility better
    const faces = {};

    for (const face of ["U", "D", "F", "B", "L", "R"]) {
        faces[face] = Array.from({ length: 3 }, () => Array(3).fill(null));
    }

    for (const sticker of cube) {
        const face = faceForNormal[sticker.normal.join(",")];
        const [row, column] = gridPositionForFace[face](sticker.position);

        faces[face][row][column] = sticker.color;
    }

    return faces;
}

module.exports = { toFaceGrids };