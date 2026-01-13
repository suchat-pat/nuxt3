require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path')
const app = express()

app.use(cors ({
    origin:'http://localhost:3000',
    credentials: true,
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join('uploads')))

// API  Routes =======================
const profile = require('./routes/profile')
user.app('/api/profile',profile)


// Block 404 Status
app.use( (req,res) => res.status(404).json({ message: 'เซิร์ฟเวอร์กำลังปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log('Server Running On Port 3001'))