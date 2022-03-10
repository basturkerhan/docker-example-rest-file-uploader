const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/logout", UserController.logout);

module.exports = router;