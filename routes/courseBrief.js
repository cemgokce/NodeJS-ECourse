const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseBriefController = require("../controllers/courseBrief.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", courseBriefController.getById);
router.get("/", courseBriefController.getAll);

// Protected routes
router.post("/", courseBriefController.create);
router.put("/:id", courseBriefController.update);
router.delete("/:id", courseBriefController.delete);

module.exports = router;

