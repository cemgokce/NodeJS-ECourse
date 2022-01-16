require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const category = require('./models/category');
const course = require('./models/Course');
const courseCategory = require('./models/courseCategory');
const coursePrices = require('./models/coursePrices');
const price = require('./models/price');
const role = require('./models/role');
const user = require('./models/user');
const userRole = require('./models/userRole');
const routes = require('./routes');


const sequelize = require("./config/sequelize.config");

app.use(bodyParser.json());

// Route Middlewares
// app.use("/auth", routes.auth);
// app.use("/users", routes.users);
// app.use("/roles", routes.roles);
// app.use("/userRoles", routes.userRoles);
app.use("/categories", routes.categories);
app.use("/prices", routes.prices);

app.use("/courses", routes.courses);
// app.use("/productCategories", routes.productCategories);
// app.use("/productLibraries", routes.productLibraries);

app.use((req, res) => {
    res.status(404).send("404 Page not found.");
});
sequelize
    .sync({ force: false })
    .then(result => {
        // console.log(result);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err))



