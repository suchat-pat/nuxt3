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
app.use('/api/profile',profile)

const auth = require('./routes/auth')
app.use('/api/auth',auth)

// Staff API =========================
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)


// Block 404 Status
app.use( (req,res) => res.status(404).json({ message: 'เซิร์ฟเวอร์กำลังปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log('Server Running On Port 3001'))