const express = require("express")
const router = express.Router();
const { studentAuth, teacherAuth, adminAuth } = require("../middlewares/verifyToken");
const rolesController = require("../controllers/roles.controller")



//get methods
//all routes starts with /roles
router.get("/:id", adminAuth, rolesController.getById);
router.get("/", adminAuth, rolesController.getAll);

// Protected routes
router.post("/", rolesController.create);
router.put("/:id", adminAuth, rolesController.update);
router.delete("/:id", adminAuth, rolesController.delete);

module.exports = router;

