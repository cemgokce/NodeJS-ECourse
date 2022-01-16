const express = require("express")
const router = express.Router();
const courseCategoriesController = require("../controllers/courseCategories.controller")


//get methods
//all routes starts with /courseCategories 
router.get("/:id", courseCategoriesController.getById);
router.get("/", courseCategoriesController.getAll);

// Protected routes
router.post("/", courseCategoriesController.create);
router.put("/:id", courseCategoriesController.update);
router.delete("/:id", courseCategoriesController.delete);

module.exports = router;

