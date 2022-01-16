const express = require("express")
const router = express.Router();
const courseController = require("../controllers/courses.controller")


//all routes starts with /categories 
router.get("/category/:categoryId", courseController.findAllCoursesByCategoryId);
router.get("/get", courseController.findAllCoursesPaginate);  //TODO: The path can be changed

//get methods
router.get("/:id", courseController.getById);
router.get("/", courseController.getAll);

// Protected routes
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;

