const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseController = require("../controllers/courses.controller")


//all routes starts with /categories 
// router.get("/category/:categoryId", courseController.findAllCoursesByCategoryId);
// router.get("/get", courseController.findAllCoursesPaginate);  //TODO: The path can be changed

//get methods
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);

// Protected routes
router.post("/", teacherAuth, courseController.create);
router.put("/:id", teacherAuth, courseController.update);
router.delete("/:id", teacherAuth, courseController.delete);

module.exports = router;

