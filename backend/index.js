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

<<<<<<< HEAD
//eva
const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)



=======
// Staff API =========================
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

>>>>>>> 51a3aa9144b6fefeb0f94e3e6b78eec733a07534
// Block 404 Status
app.use( (req,res) => res.status(404).json({ message: 'เซิร์ฟเวอร์กำลังปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log('Server Running On Port 3001'))