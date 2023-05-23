const {Router} = require("express")
const {home, search} = require("../controllers/home.controller")
const isAuth = require("../middleware/isAuth")

const router = Router()

router.get("/", isAuth, home)
router.put("/search", isAuth, search)


module.exports = router