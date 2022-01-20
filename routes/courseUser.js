const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseUserController = require("../controllers/courseUsers.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", courseUserController.getById);
router.get("/", courseUserController.getAll);

// Protected routes
router.post("/", courseUserController.create);
router.put("/:id", courseUserController.update);
router.delete("/:id", courseUserController.delete);

module.exports = router;

