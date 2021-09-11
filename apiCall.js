const database = require("./db/db.json");
const fs = require("fs");
const exp = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

exp.use(express.json());
exp.use(express.urlencoded({ extended: true }));
exp.use(express.static("public"));


//GET Route
exp.get("/api/notes", (req, res) => {
    console.log(`${req.method} request received NOTES routes`);
    res.json(database);
});


//POST Route
exp.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received NOTES routes`);

    let newNotes = req.body;
    newNotes.id = uuid();
    database.push(newNotes);
    generateJsonFile();
    req.send(database);
});


exp.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



exp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Setup listener
exp.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);


// Created  db file each time a new note is added
generateJsonFile = () => {
    fs.writeFile("./db/db.json", JSON.stringify(database), (writeErr) =>
        writeErr ? console.error(writeErr) : console.log("Successfully updated  new notes id!")
    )
}