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

//eva
const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

//commit
const save_score = require('./routes/Commit/save_score')
app.use('/api/Commit/save_score',save_score)

const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

// Staff API =========================
const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round_eva = require('./routes/Staff/round_eva')
app.use('/api/Staff/round_eva',round_eva)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

// Block 404 Status
app.use( (req,res) => res.status(404).json({ message: 'เซิร์ฟเวอร์กำลังปิดปรับปรุง!' }) )

app.listen(3001 , () => console.log('Server Running On Port 3001'))