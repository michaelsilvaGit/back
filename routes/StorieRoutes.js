const express = require("express");
const router = express.Router();




//Controller
const {insertStorie, getUserStorie, deleteStorie, getAllStories, likeStorie} = require("../controllers/StorieController");


//Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");
const {imageUpload} = require("../middlewares/imageUpload");


//Router
router.post("/", authGuard, imageUpload.single("image"), validate, insertStorie);
router.get("/", authGuard, getAllStories);
router.delete("/:id", authGuard, deleteStorie);
router.get("/user/:id", authGuard, getUserStorie);
router.put("/like/:id", authGuard, likeStorie);


module.exports = router;