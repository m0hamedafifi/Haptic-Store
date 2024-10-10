const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.Controller");
const adminLoginController = require("../Admin/admin.login");

// ----------------------------------------------------------------
// Defining a POST route for adding a new user
// ----------------------------------------------------------------

router.post("/users/add",  userController.createUser);
router.post("/admin/login", adminLoginController.signInWithUsernamePassword);

module.exports = router;
