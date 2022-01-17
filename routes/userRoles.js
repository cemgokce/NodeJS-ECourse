const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const userRoles = require("../controllers/userRoles.controller")

//get methods
//all routes starts with /userroles
router.get("/:id", adminAuth, userRoles.getById);
router.get("/", adminAuth, userRoles.getAll);

// Protected routes
router.post("/", adminAuth, userRoles.create);
router.put("/:id", adminAuth, userRoles.update);
router.delete("/:id", adminAuth, userRoles.delete);

module.exports = router;

