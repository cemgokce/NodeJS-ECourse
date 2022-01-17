const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const categoriesController = require("../controllers/categories.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", categoriesController.getById);
router.get("/", categoriesController.getAll);

// Protected routes
router.post("/", teacherAuth, categoriesController.create);
router.put("/:id", teacherAuth, categoriesController.update);
router.delete("/:id", teacherAuth, categoriesController.delete);

module.exports = router;

