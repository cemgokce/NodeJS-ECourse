require("dotenv").config();
const express = require("express");
const app = express();
const category = require('./models/category');
const course = require('./models/Course');
const courseCategory = require('./models/courseCategory');
const coursePrices = require('./models/coursePrices');
const price = require('./models/price');
const role = require('./models/role');
const user = require('./models/user');
const userRole = require('./models/userRole');


const sequelize = require("./config/sequelize.config");

app.get("/", (req, res) => {
    res.send("hey from the homepage!");
});
sequelize
    .sync({ force: false })
    .then(result => {
        console.log(result);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err))



