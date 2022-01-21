const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const userRoles = require("../controllers/userRoles.controller")

//get methods
//all routes starts with /userroles
router.get("/:id",  userRoles.getById);
router.get("/", userRoles.getAll);

// Protected routes
router.post("/", userRoles.create);
router.put("/:id", userRoles.update);
router.delete("/:id", userRoles.delete);

module.exports = router;

