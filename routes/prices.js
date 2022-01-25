const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const priceController = require("../controllers/prices.controller")


//get methods
//all routes starts with /prices 
router.get("/:id", priceController.getById);
router.get("/", priceController.getAll);

// Protected routes
router.post("/", priceController.create);
router.put("/:id", priceController.update);
router.delete("/:id", priceController.delete);

module.exports = router;

