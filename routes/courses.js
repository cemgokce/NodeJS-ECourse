const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courses.controller")


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

module.exports = router;

