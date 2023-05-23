const Io = require('../utils/io')
const Users = new Io("./db/users.json")
const Videos = new Io("./db/videos.json")


exports.videoPage = async(req,res) => {
    const userID = req.user.id 
    const videos = await Videos.read()
    const users = await Users.read()
    const {id} = req.params
    let findVideo = videos.find(v=> v.id === id)
    const {user_id, views} = findVideo
    const checkViews = views.find(v=> v === userID)
    if (!checkViews) {
        findVideo.views.push(userID)
        Videos.write(videos)
        return
    }
    const findUser = users.find(u=> u.id === user_id)
    res.render("video", {
        findVideo,
        findUser
    })
}



exports.like = async(req,res)=> {
  try {
    const {id} = req.user
    const {videoId} = req.params
    const videos = await Videos.read()
    const findVideo = videos.find(v=> v.id === videoId)
    let {likes, dizlikes} = findVideo
    const checkLike = likes.find(l=> l === id)
    if (checkLike) return res.status(200).json({message: "You already liked this video"})
    findVideo.dizlikes = dizlikes.filter(d=> d !== id)
    likes.push(id)
    Videos.write(videos)
    res.status(200).json({message: "Success"})
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"})
  }
}

exports.dizlike = async(req,res)=> {
   try {
    const {id} = req.user
    const {videoId} = req.params
    const videos = await Videos.read()
    const findVideo = videos.find(v=> v.id === videoId)
    let {dizlikes, likes} = findVideo
    const checkDiz = dizlikes.find(d=> d === id)
    if (checkDiz) return res.status(200).json({message: "You already dizliked this video"})
    findVideo.likes = likes.filter(d=> d !== id)
    dizlikes.push(id)
    Videos.write(videos)
    res.status(200).json({message: "Success"})
   } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"})
   }
}

exports.subscribe = async(req,res) => {
    try {
    const users = await Users.read()
    const {id} = req.user
    const {userId} = req.params
    if (id === userId) return res.status(403).json({message: "You cannot subscribe to your own channel"})
    const findUser = users.find(u=> u.id === id)
    let {subs} = findUser
    const checkSubs = subs.find(u=> u === userId)
    if (checkSubs) return res.status(403).json({message: "You already subscribed to this channel"})
    subs.push(userId)
    Users.write(users)
    res.status(200).json({message: "Success"})
    } catch (error) {
    res.status(500).json({message: error.message})
    }
} 