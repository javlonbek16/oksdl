const {Router} = require("express")
const {getProfile} = require("../controllers/profile.controller")
const isAuth = require("../middleware/isAuth")

const router = Router()

router.get("/profile/:userId", isAuth, getProfile)

module.exports = router