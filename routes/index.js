const auth = require("./auth");
const users = require("./users");
const roles = require("./roles");
const userRoles = require("./userRoles");
const categories = require("./categories");
const prices = require("./prices");
const courses = require("./courses");
const coursesCategories = require("./courseCategories");
const coursPrices = require("./coursePrices")

const routes = {

    auth,
    users,
    roles,
    userRoles,
    categories,
    prices,
    courses,
    coursesCategories,
    coursPrices
};

module.exports = routes;
