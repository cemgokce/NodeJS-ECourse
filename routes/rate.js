const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const rateController = require("../controllers/rates.controller")

//get methods
//all routes starts with /categories 
router.get("/:id", rateController.getById);
router.get("/", rateController.getAll);

// Protected routes
router.post("/", rateController.create);
router.put("/:id", rateController.update);
router.delete("/:id", rateController.delete);

module.exports = router;

