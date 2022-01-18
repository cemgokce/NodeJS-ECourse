const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseController = require("../controllers/courses.controller");
const { route } = require("express/lib/router");


//all routes starts with /categories 
// router.get("/category/:categoryId", courseController.findAllCoursesByCategoryId);
// router.get("/get", courseController.findAllCoursesPaginate);  //TODO: The path can be changed

//get methods
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);

// Protected routes
router.post("/", courseController.create);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);

//getCoursesByCategoryId
router.get("/:id/category", courseController.getByCategoryId);

//getCourseByName
router.get("/:name/search", courseController.getByName);

module.exports = router;

