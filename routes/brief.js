const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const briefController = require("../controllers/brief.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", briefController.getById);
router.get("/", briefController.getAll);

// Protected routes
router.post("/", briefController.create);
router.put("/:id", briefController.update);
router.delete("/:id", briefController.delete);

module.exports = router;

