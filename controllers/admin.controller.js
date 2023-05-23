const Joi = require('joi')
const Video = require('../models/video')
const Io = require("../utils/io")
const Videos = new Io("./db/videos.json")
const Users = new Io("./db/users.json")
const {v4} = require('uuid')
exports.admin = async(req,res) => {
    const videos = await Videos.read()
    const findVideos = videos.filter(v=> v.user_id === req.user.id)
    res.render('admin', {
        findVideos
    })
}

exports.add = async(req,res) => {
    const videos = await Videos.read()
    const {title} = req.body
    if (!req.files) {
        res.status(400).json({message: "Please choose a video"})
        return
    }
    const {video} = req.files
    const schema = Joi.object({
        title: Joi.string().required(),
        video: Joi.required()
    })
    const {error} = schema.validate({title, video})
    if (error) {
     res.status(400).json({error: error.message})
       return
    }
    const videoName = `${v4()}.${video.mimetype.split('/')[1]}`
    video.mv(`${process.cwd()}/uploads/videos/${videoName}`)
    const date = new Date()
    const newVideo = new Video(v4(), req.user.id, videoName, date, title.toLowerCase(), [], [], [])
    const data = videos.length ? [...videos, newVideo] : [newVideo]
    Videos.write(data)
    res.status(201).json({message: "Success"})
}

exports.logOut = (req,res) => {
    res.clearCookie("token")
    res.redirect("/")
}

exports.deleteV = async (req, res) => { 
    try {
    const {videoId} = req.params
    const {id} = req.user
    const videos = await Videos.read()
    const findVideo = videos.find(v=> v.user_id === id)
    if (!findVideo) {
        res.status(403).json({message: "Conflict"})
    }
    const findVideos = videos.filter(v=> v.id!== videoId)
    Videos.write(findVideos)
    res.status(200).json({message: "Success"})
    } catch (error) {
        res.status(500).json({error:"INTERNAL SERVER ERROR"})
    }
}

exports.editPage = async (req, res) => {
    res.render("edit")
}

exports.edit = async(req,res)=> {
    const users = await Users.read()
    const {username, password} = req.body
    const {id} = req.user
    let findUser = users.find(u=> u.id === id)
    if (!findUser) {
        res.status(403).json({message: "Conflict"})
    }
    findUser.username = username ? username : findUser.username
    findUser.password = password ? password : findUser.password
    if (req?.files?.image) {
        imageName = `${v4()}.${req.files.image.mimetype.split("/")[1]}`
        req.files.image.mv(`${process.cwd()}/uploads/imgs/${imageName}`)
        findUser.image = imageName
    }
    Users.write(users)
    res.status(200).json({message: "Success"})
}