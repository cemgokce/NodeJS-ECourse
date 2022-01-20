const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const commentController = require("../controllers/comments.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", commentController.getById);
router.get("/", commentController.getAll);

// Protected routes
router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;

