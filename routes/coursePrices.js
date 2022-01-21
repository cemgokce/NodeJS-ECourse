const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const coursePriceController = require("../controllers/coursePrices.controller")

//get methods
//all routes starts with /coursePrices 
router.get("/:id", coursePriceController.getById);
router.get("/", coursePriceController.getAll);

// Protected routes
router.post("/", coursePriceController.create);
router.put("/:id", coursePriceController.update);
router.delete("/:id", coursePriceController.delete);

module.exports = router;

