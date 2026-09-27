function createSolvedCube() {
    const stickers = [];

    for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <=1; b++) {
            /* X: -1 = left, 0 = middle, 1 = right
               Y: -1 = bottom, 0 = middle, 1 = top
               Z: -1 = back, 0 = middle, 1 = front
            Example: sticker [1, 1, 1] is the top-right-front corner */
            stickers.push(
                // Front and back, fixed z:
                { color: "green", position: [a, b, 1], normal: [0, 0, 1]} , 
                { color: "blue", position: [a, b, -1], normal: [0, 0, -1]} ,
                
                // TOp and bottom, fixed y:
                { color: "white", position: [a, 1, b], normal: [0, 1, 0]} , 
                { color: "yellow", position: [a, -1, b], normal: [0, -1, 0]} ,             

                // Right and left: fixed x:
                { color: "red", position: [1, a, b], normal: [1, 0, 0]} , 
                { color: "orange", position: [-1, a, b], normal: [-1, 0, 0]} 
            );
        }
    }

    return stickers;
}

function rotateAroundZ([x, y, z], quarterTurns) {
    if (Math.abs(quarterTurns) === 2) {
        return [x === 0 ? 0 : -x,
                y === 0 ? 0 : -y,
                z,
        ];
    }

    if (quarterTurns === -1) {
        return [y, x === 0 ? 0 : -x, z];
    }
    
    return [y === 0 ? 0 : -y, x, z];
}

function rotateAroundX([x, y, z], quarterTurns) {
    if (Math.abs(quarterTurns) === 2) {
        return [
            x, 
            y === 0 ? 0 : -y,
            z === 0 ? 0 : -z,
        ];
    }

    if (quarterTurns === -1) {
        return [x, z, y === 0 ? 0 : -y]
    }

    return [x, z === 0 ? 0 : -z, y];
}

function rotateAroundY([x, y, z], quarterTurns) {
    if (Math.abs(quarterTurns) === 2) {
        return [
            x === 0 ? 0 : -x,
            y,
            z === 0 ? 0 : -z,
        ];
    }

    if (quarterTurns === -1) {
        return [z === 0 ? 0 : -z, y, x];
    }

    return [z, y, x === 0 ? 0 : -x];
}

function rotateLayer(cube, axis, layer, quarterTurns) {
    if (!["x", "y", "z"].includes(axis) || ![-2, -1, 1, 2].includes(quarterTurns)) {
        throw new Error ("Rotations around X, Y, Z with their quarter-turns and half-turns are working rn"); // just for now
    }

    const axisIndex = { x: 0, y: 1, z: 2 }[axis];

    const rotate = { x: rotateAroundX, y: rotateAroundY, z: rotateAroundZ, }[axis];

        return cube.map((sticker) => {
            if (sticker.position[axisIndex] !== layer) {
                return {
                    ...sticker,
                    position: [...sticker.position],
                    normal: [...sticker.normal],
                };
            }

        return {
            ...sticker,
            position: rotate(sticker.position, quarterTurns),
            normal: rotate(sticker.normal, quarterTurns),
        }; 
    });
}

module.exports = { createSolvedCube, rotateLayer };