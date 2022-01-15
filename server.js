require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("hey from the homepage!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: http://localhost:${process.env.PORT}`);
});