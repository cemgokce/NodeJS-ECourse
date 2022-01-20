require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes');
const sequelize = require("./config/sequelize.config");

// #region MODELS

//category
const category = require('./models/category');
//course
const course = require('./models/Course');
//price
const price = require('./models/price');
//comment
const comment = require('./models/comment');
//content
const content = require('./models/content');
//rate
const rate = require('./models/rate');
//brief
const brief = require('./models/brief');
//user
const role = require('./models/role');
const user = require('./models/user');

//userRelation
const userRole = require('./models/userRole');
const userCourse = require('./models/userCourses');

//courseRelation
const courseCategory = require('./models/courseCategory');
const coursePrices = require('./models/coursePrices');
const courseComment = require('./models/courseComments');
const courseRate = require('./models/courseRates');
const courseContent = require('./models/courseContents');
const courseUser = require('./models/courseUsers');

//#endregion


//#region MİDDLEWARE

app.use(bodyParser.json());

//adding cors
app.use(cors());

// Route Middlewares

//auth 
app.use("/auth", routes.auth);

//user
app.use("/users", routes.users);
app.use("/roles", routes.roles);
app.use("/userRoles", routes.userRoles);

//course
app.use("/courses", routes.courses);
app.use("/coursePrices", routes.coursPrices);
app.use("/courseCategories", routes.coursesCategories);

//category
app.use("/categories", routes.categories);

//price
app.use("/prices", routes.prices);

//not found
app.use((req, res) => {
    res.status(404).send("404 Page not found.");
});

//#endregion


//database synchronization before listening to port
sequelize
    .sync({ force: false })
    .then(result => {
        // console.log(result);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err))



