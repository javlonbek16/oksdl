const {Router} = require("express")
const {admin, add, logOut, deleteV, editPage, edit} = require("../controllers/admin.controller")
const isAuth = require("../middleware/isAuth")

const router = Router()

router.get("/profile", isAuth ,admin)


router.post("/profile/add", isAuth ,add)
router.delete("/profile/logout", isAuth, logOut)
router.delete("/profile/delete/:videoId", isAuth, deleteV)
router.get("/profile/edit", isAuth, editPage)
router.post("/profile/edit", isAuth, edit)

module.exports = router