const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const courseRateController = require("../controllers/couorseRates.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", courseRateController.getById);
router.get("/", courseRateController.getAll);

// Protected routes
router.post("/", courseRateController.create);
router.put("/:id", courseRateController.update);
router.delete("/:id", courseRateController.delete);

module.exports = router;

