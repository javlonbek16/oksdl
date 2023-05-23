const Io = require('../utils/io')
const Users = new Io("./db/users.json")
const Videos = new Io("./db/videos.json")

exports.likes = async(req,res)=> {
    const videos = await Videos.read()
    const {id} = req.user
    const arr = []
    for (let i = 0; i < videos.length; i++) {
        const checkLike = videos[i].likes.includes(id)
        if (checkLike) {
            arr.push(videos[i])
        }
    }
    res.render("likes", {
        arr
    })
}