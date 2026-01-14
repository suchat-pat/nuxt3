const express = require('express')
const bc = require('bcryptjs')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// ================= DEMO =================
// get API
// router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
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
        const [rows] = await db.query(`select * from tb_indicate,tb_topic where tb_indicate.id_topic=tb_topic.id_topic order by id_indicate desc`)
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

// get API By params
router.get('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const [rows] = await db.query(`select * from tb_indicate where id_indicate='${id_indicate}' order by id_indicate desc`)
        if(rows.length === 0) return res.status(403).json({ message:'ไม่พบข้อมูล' })
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

// post API
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate (id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values (?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Insert Succes'})
    }catch(err){
        console.error("Error Insert",err)
        res.status(500).json({ message:'Error Insert' })
    }
})

// put API
router.put('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate='${id_indicate}'`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Update Succes'})
    }catch(err){
        console.error("Error Update",err)
        res.status(500).json({ message:'Error Update' })
    }
})

// delete API
router.delete('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        // const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`delete from tb_indicate where id_indicate='${id_indicate}'`)
        res.json({rows,message:'Delete Succes'})
    }catch(err){
        console.error("Error Delete",err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router