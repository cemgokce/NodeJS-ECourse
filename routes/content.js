const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const contentController = require("../controllers/contents.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", contentController.getById);
router.get("/", contentController.getAll);

// Protected routes
router.post("/", contentController.create);
router.put("/:id", contentController.update);
router.delete("/:id", contentController.delete);

module.exports = router;

