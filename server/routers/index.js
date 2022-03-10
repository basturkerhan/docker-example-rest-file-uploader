const express = require("express");
const router = express.Router();

const FileRouter = require("./FileRouter");
const UserRouter = require("./UserRouter");

router.use("/files", FileRouter);
router.use("/user", UserRouter);

module.exports = router;