const Io = require('../utils/io')
const Users = new Io("./db/users.json")
const Videos = new Io("./db/videos.json")

exports.home = async(req,res) => {
    const users = await Users.read()
    const {id} = req.user
    const findUser = users.find(u=> u.id === id)
    const {subs} = findUser 
    let getSubs = []
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < subs.length; j++) {
                if (users[i].id === subs[j]) {
                    const user = {
                        username: users[i].username,
                        image: users[i].image,
                        id: users[i].id
                    }
                    getSubs.push(user)
                }
            }
            }
    const videos = await Videos.read()
    let arr = []
        if (videos.length > 5) 
          while (arr.length <= 5) {
            let randomIndex = Math.floor(Math.random() * videos.length);
            let randomElement = videos[randomIndex];
            if (!arr.includes(randomElement)) {
              arr.push(randomElement);
            }
            res.render("index", {
                findUser,
                arr
              })
          }
          else {
            for (let i = 0; i < videos.length; i++) {
                arr.push(videos[i])
              }
              res.render("index", {
                findUser,
                arr,
                getSubs
              })
          }
}

exports.search = async(req,res) => {
  try {
  const {title} = req.query
  const videos = await Videos.read()
  if (!title) return res.status(403).json({message: "Зlease write the name of the video"})
  const findVideos = videos.filter(v=> v.title.includes(title.toLowerCase()))
  res.status(200).json({data: findVideos})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}