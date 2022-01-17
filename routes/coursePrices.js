const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const coursePriceController = require("../controllers/coursePrices.controller")

//get methods
//all routes starts with /coursePrices 
router.get("/:id", coursePriceController.getById);
router.get("/", coursePriceController.getAll);

// Protected routes
router.post("/", teacherAuth, coursePriceController.create);
router.put("/:id", teacherAuth, coursePriceController.update);
router.delete("/:id", teacherAuth, coursePriceController.delete);

module.exports = router;

