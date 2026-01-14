const express = require('express')
const bc = require('bcryptjs')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// ================= DEMO =================
// get API
// router.get('/eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
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
router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

// get API By Params
router.get('/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_topic} = req.params
        const [rows] = await db.query(`select * from tb_topic where id_topic='${id_topic}'`)
        if(rows.length === 0) return res.status(500).json({messsage:"ไม่พบข้อมูล"})
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

// post API
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic (name_topic) values (?)`,[name_topic])
        res.json({rows,message:'Insert Success'})
    }catch(err){
        console.error("Error Insert",err)
        res.status(500).json({ message:'Error Insert' })
    }
})

// put API
router.put('/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_topic} = req.params
        const {name_topic} = req.body
        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic='${id_topic}'`,[name_topic])
        res.json({rows,message:'Update Success'})
    }catch(err){
        console.error("Error Update",err)
        res.status(500).json({ message:'Error Update' })
    }
})

// delete API
router.delete('/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_topic} = req.params
        const [rows] = await db.query(`delete from tb_topic where id_topic='${id_topic}'`)
        res.json({rows,message:'Delete Success'})
    }catch(err){
        console.error("Error Delete",err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router