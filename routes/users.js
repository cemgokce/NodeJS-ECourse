const express = require("express")
const router = express.Router();
const usersController = require("../controllers/users.controller")


//get methods
//all routes starts with /users
router.get("/:id", usersController.getById);
router.get("/", usersController.getAll);

// Protected routes
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
