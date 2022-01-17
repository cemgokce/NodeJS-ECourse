const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const usersController = require("../controllers/users.controller")


//get methods
//all routes starts with /users
router.get("/:id", adminAuth, usersController.getById);
router.get("/", adminAuth, usersController.getAll);

// Protected routes
router.post("/", adminAuth, usersController.create);
router.put("/:id", adminAuth, usersController.update);
router.delete("/:id", adminAuth, usersController.delete);

module.exports = router;
