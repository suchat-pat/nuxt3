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
        const [rows] = await db.query(`select * from tb_system order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error("Error Get",err)
        res.status(500).json({ message:'Error Get' })
    }
})

// get API By params
router.get('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const [rows] = await db.query(`select * from tb_system where id_sys='${id_sys}' order by id_sys desc`)
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
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system (day_open,day_out,round_sys,year_sys,status_sys) values (?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json({rows,mesage:'Insert Success'})
    }catch(err){
        console.error("Error Insert",err)
        res.status(500).json({ message:'Error Insert' })
    }
})

// put API
router.put('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys='${id_sys}'`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json({rows,mesage:'Update Success'})
    }catch(err){
        console.error("Error Update",err)
        res.status(500).json({ message:'Error Update' })
    }
})

// delete API
router.delete('/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_sys} = req.params
        const [rows] = await db.query(`delete from tb_system where id_sys='${id_sys}'`)
        res.json({rows,mesage:'Delete Success'})
    }catch(err){
        console.error("Error Delete",err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router