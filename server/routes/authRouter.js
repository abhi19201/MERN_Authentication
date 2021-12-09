const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.checkAuth);

router.post("/login", authController.userLogin);

router.post("/signup", authController.userSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
