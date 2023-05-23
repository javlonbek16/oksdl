const Io = require('../utils/io')
const Users = new Io("./db/users.json")
const Videos = new Io("./db/videos.json")

exports.getProfile = async(req,res)=> {
   try {
    const users = await Users.read()
    const videos = await Videos.read()
    const {userId} = req.params
    const {id} = req.user
    if (userId === id) return res.redirect("/profile")
    const findUser = users.find(u=> u.id === userId)
    const findVideos = videos.filter(v=> v.user_id === userId)
    const user = {
        username: findUser.username,
        image: findUser.image
    }
    res.render("profile", {
        user,
        findVideos
    })
   } catch (error) {
    res.status(500).json({error: error.message})
   }
}


