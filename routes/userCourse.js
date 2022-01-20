const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const userCourseController = require("../controllers/userCourses.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", userCourseController.getById);
router.get("/", userCourseController.getAll);

// Protected routes
router.post("/", userCourseController.create);
router.put("/:id", userCourseController.update);
router.delete("/:id", userCourseController.delete);

module.exports = router;

