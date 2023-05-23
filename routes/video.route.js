const {Router} = require("express")
const {like, dizlike, videoPage, video, subscribe} = require("../controllers/video.controller")
const isAuth = require("../middleware/isAuth")

const router = Router()
router.get("/video/:id", isAuth, videoPage)


router.put("/like/:videoId", isAuth, like)
router.put("/dizlike/:videoId", isAuth, dizlike)
router.put("/subscribe/:userId", isAuth, subscribe)


module.exports = router