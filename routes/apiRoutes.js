// Import data.js
const storedData = require("../db/data");

// Function api routes backend to store data and get , post , delete
module.exports = function (app) {

    app.get("/api/notes/", function (req, res) {
        res.json(storedData);
    });

    app.post("/api/notes/", function (req, res) {
        storedData.push(req.body);
        res.json(true);
    })

    app.delete("/api/notes/", function (req, res) {
        storedData.length = 0;
        res.json({ ok: true });
    })

};