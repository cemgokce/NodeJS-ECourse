const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseCategoriesController = require("../controllers/courseCategories.controller")


//get methods
//all routes starts with /courseCategories 
router.get("/:id", courseCategoriesController.getById);
router.get("/", courseCategoriesController.getAll);

// Protected routes
router.post("/", teacherAuth, courseCategoriesController.create);
router.put("/:id", teacherAuth, courseCategoriesController.update);
router.delete("/:id", teacherAuth, courseCategoriesController.delete);

module.exports = router;

