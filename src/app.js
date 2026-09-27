const express = require("express");
const { createCubeStorage } = require("./cube-storage");
const { toFaceGrids } = require("./cube-serializer");

function createApp(storage = createCubeStorage()) {
    const app = express();

    app.use(express.json());

    app.get("/cube", (req, res) => {
        res.json({ faces: toFaceGrids(storage.getCube()) });
        //res.json({ stickers: storage.getCube() });
    });

    app.post("/cube/moves", (req, res) => {
        if (!req.body || typeof req.body.move !== "string") {
            return res.status(400).json({ error: "Request body must include a valid string move." });
        }

        try {
            const stickers = storage.applyMove(req.body.move);
            res.json({ faces: toFaceGrids(storage.getCube()) });
            //return res.json({ stickers });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });

    app.post("/cube/reset", (req, res) => {
        const stickers = storage.reset()
        res.json({ faces: toFaceGrids(stickers) });
    });

    return app;
}

module.exports = { createApp };