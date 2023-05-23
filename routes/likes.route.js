const {Router} = require("express")
const {likes} = require("../controllers/likes.controller")
const isAuth = require("../middleware/isAuth")

const router = Router()

router.get("/liked/videos", isAuth ,likes)

module.exports = router