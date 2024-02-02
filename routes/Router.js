const express = require("express")
const router = express()



//Controller
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));
router.use("/api/stories", require("./StorieRoutes"));




module.exports = router
