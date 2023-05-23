const Joi = require("joi")
const Io = require("../utils/io")
const Users = new Io("./db/users.json")
const User = require("../models/user")
const {v4} = require("uuid")
const {hash, compare} = require("bcrypt")
const jwt = require("../utils/jwt")

exports.register = (req,res)=> {
    res.render("register")
}

exports.login = (req,res)=> {
    res.render("login")
}

exports.signup = async(req,res)=> {
    try {
        const {username, password} = req.body
        const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    const {error} = schema.validate({username, password})
    if (error) {
        return res.status(400).json({message: error.message})
    }
    const users = await Users.read()
    const user = users.find(user => user.username === username)
    if (user) {
        return res.status(403).json({message: "User already registered"})
    }
    let imageName = "userImage.png"
    if (req?.files?.image) {
        imageName = `${v4()}.${req.files.image.mimetype.split("/")[1]}`
        req.files.image.mv(`${process.cwd()}/uploads/imgs/${imageName}`)
    }
    const hashPassword = await hash(password, 12)
    const id = v4()
    const newUser = new User(username, hashPassword, id, imageName, [])
    const data = users.length ? [...users, newUser] : [newUser]
    Users.write(data)
    res.cookie("token", jwt.sign({id}), {maxAge: 86400000})
    res.status(201).json({message: "Success"})
    } catch (error) {
     res.status(500).json({message: error.message})   
    }
}

exports.signin = async(req,res)=> {
    try {
        const {username, password} = req.body
        const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    const {error} = schema.validate({username, password})
    if (error) {
        return res.status(400).json({message: error.message})
    }
    const users = await Users.read()
    const user = users.find(user => user.username === username)
    if (!user) {
        return res.status(403).json({message: "Forbidden"})
    }
    const comparePassword = await compare(password, user.password)
    if (!comparePassword) {
        return res.status(403).json({message: "Forbidden"})
    }
    res.cookie("token", jwt.sign({id: user.id}), {maxAge: 86400000})
    res.status(200).json({message: "Success"})
    } catch (error) {
     res.status(500).json({message: error.message})   
    }
}
