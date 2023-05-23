const {Router} = require("express")
const {register, login, signup, signin} = require("../controllers/auth.controller")

const router = Router()

router.get("/auth/register", register)
router.get("/auth/login", login)

router.post("/auth/register", signup)
router.post("/auth/login", signin)



module.exports = router