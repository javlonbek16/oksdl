const home = require('../routes/home.route');
const auth = require('../routes/auth.route');
const admin  = require('../routes/admin.route');
const video  = require('../routes/video.route');
const profile  = require('../routes/profile.router');
const likes  = require('../routes/likes.route');


module.exports = [auth,home, admin, video, profile, likes]