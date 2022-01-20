const auth = require("./auth");

const users = require("./users");
const roles = require("./roles");
const userRoles = require("./userRoles");
const userCourses = require("./userCourse");


const categories = require("./categories");
const prices = require("./prices");
const rates = require("./rate");
const comments = require("./comment");
const contents = require("./content");
const briefs = require("./brief");

const courses = require("./courses");
const coursesCategories = require("./courseCategories");
const coursPrices = require("./coursePrices")
const courseComments = require("./courseComment")
const courseContents = require("./courseContent")
const courseBriefs = require("./courseBrief")
const courseRates = require("./courseRate")
const courseUsers = require("./courseUser")


const routes = {

    auth,
    users,
    roles,
    userRoles,
    userCourses,
    categories,
    prices,
    rates,
    contents,
    comments,
    briefs,
    courses,
    coursesCategories,
    coursPrices,
    courseComments,
    courseBriefs,
    courseRates,
    courseContents,
    courseUsers,

};

module.exports = routes;
