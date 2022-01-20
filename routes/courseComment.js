const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseCommentController = require("../controllers/courseComments.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", courseCommentController.getById);
router.get("/", courseCommentController.getAll);

// Protected routes
router.post("/", courseCommentController.create);
router.put("/:id", courseCommentController.update);
router.delete("/:id", courseCommentController.delete);

module.exports = router;

