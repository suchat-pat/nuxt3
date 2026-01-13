const express = require('express')
const bc = require('bcryptjs')
const router = express.Router()
const db = require('../../db')
const {verfyToken,requireRole} = require('../../middleware/authMiddleware')

router.get('/eva',async (req,res))