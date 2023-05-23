
const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/')
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cookieParser());
app.use(express.static(process.cwd() + "/uploads/imgs"))
app.use(express.static(process.cwd() + "/uploads/videos"))
app.use(express.static(process.cwd() + "/img"))
app.use(express.static(process.cwd() + "/css"))
app.set('view engine', 'ejs')

app.use(router)

app.listen(5000, () => {
    console.log(5000);
})
