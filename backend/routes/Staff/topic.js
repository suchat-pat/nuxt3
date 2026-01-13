const express = require('express')
const bc = require('bcryptjs')
const router = express.Router()
const db = require('../../db')
const {verfyToken,requireRole} = require('../../middleware/authMiddleware')

// ================= DEMO =================
// get API
// router.get('/eva',verfyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error("Error Get",err)
//         res.status(500).json({ message:'Error Get' })
//     }
// })
// ================= DEMO =================

// get API
router.get('/',verfyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_topic`)
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

module.exports = router