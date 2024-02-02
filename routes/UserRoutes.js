const express = require("express");
const router = express.Router();

//Controller
const {register, login, getCurrentUser, update, getUserById, getAllUsers, insertStorie, removeInsertStorie} = require("../controllers/UserController");


//midlleswares
const validate = require("../middlewares/handleValidations");
const {userCreateValidation, loginValidation, userUpsateValidation} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const {imageUpload} = require("../middlewares/imageUpload");


//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpsateValidation(), validate, imageUpload.single("profileImage"), update);
router.put("/storie/:id", authGuard, removeInsertStorie);
router.put("/storieUser", authGuard, validate, insertStorie);
router.get("/:id", getUserById);
router.get("/", authGuard, getAllUsers);




module.exports = router;