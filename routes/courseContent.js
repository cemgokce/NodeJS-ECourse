const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseContentController = require("../controllers/courseContents.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", courseContentController.getById);
router.get("/", courseContentController.getAll);

// Protected routes
router.post("/", courseContentController.create);
router.put("/:id", courseContentController.update);
router.delete("/:id", courseContentController.delete);

module.exports = router;

