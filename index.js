const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
const folderPath = path.join(__dirname, "Date-Time");

// console.log("__dirname", __dirname);
// console.log("folderPath", folderPath);

// Check the folder exists
if (!fs.existsSync(folderPath)) {
    console.log("Creating public folder");
    fs.mkdirSync(folderPath);
}
app.get("/", (req, res) => {
    res.send("hello world")
});
 
// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
    const timestamp = new Date();
    const fileName = `${timestamp.toISOString().replace(/:/g, "-")}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, timestamp.toString(), (err) => {
        if (err) {
            console.log("Error creating file", err);
            return res.status(500).json({ message: `Error writing file - ${err}` });
        }
        res.json({ message: "File created successfully", fileName });
    });
});

// Endpoint to retreive all text files in the folder
app.get("/get-files", (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.log("Error reading files", err);
            return res.status(500).json({ message: `Error reading files - ${err}` });
        }
        res.json({ message: "Files retrieved successfully", files });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});