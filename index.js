/**
 * Cellauto Demo in HTML5 canvas
 * @author Jacob Davison
 */
const express = require("express");
const http = require("http");

const app = express();
const server = http.Server(app);

// set path resolution
app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/dist/views"));
app.use(express.static(__dirname + "/dist/css"));
app.use(express.static(__dirname + "/dist/scripts"));

// routes
app.get("/", (req, res, next) => {
    res.sendFile('index.html');
});

// create server
server.listen(3000, () => {
    console.log("Listening on port 3000!");
});