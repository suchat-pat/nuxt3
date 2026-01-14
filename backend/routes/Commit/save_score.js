const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')
const path = require('path')
const uploadDir = path.join(__dirname,'../../uploads/evadetail')

router.get('/user/:id_eva',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where c.id_member=? and c.id and e.id_member=m.id_member and e.id_sys=s.id_sys `,[id_member])
        res.json(rows[0])
    }catch(err){
        console.error("Error GET User",err)
        res.status(500).json({ message:'Error GET User' })
    }
})

router.get('/indicate/:id_eva',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where i.id_indicate=d.id_indicate and d.id_eva=? and d.status_eva in (1)`,[id_eva])
        const result = topics.map(t =>({
            ...t,
            indicates:indicates.filter((i) => i.id_topic === t.id_topic)
        }))
        res.json(result)
    }catch(err){
        console.error("Error GET Indicate",err)
    }
})

router.post('/savescore/:id_eva',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const scores = JSON.parse(req.body.scores)
        const detail_commit = req.body.detail_commit
        const [[commit]] = await db.query(`select * from tb_commit where id_eva=? and id_member=?`,[id_eva,id_member])
        var statusCommit = 0
        if(commit.level_commit === 'ประธาน'){
            statusCommit = 2
        }else if(commit.level_commit === 'กรรมการ'){
            statusCommit = 3
        }else if(commit.level_commit === 'เลขา'){
            statusCommit = 4
        }
        for(const item of scores){
            await db.query(`
                insert into tb_evadetail (id_eva,id_indicate,status_eva,score_commit) values(?,?,?,?)`,
                [id_eva,item.id_indicate,statusCommit,item.score]
            )
        }
        const [[sumRow]] = await db.query(
            `select coalesce(sum(score_commit*(select i.point_indicate from tb_indicate i where i.id_indicate=d.id_indicate)),0) as total
            from tb_evadetail d where d.id_eva=?`,[id_eva]
        )
        await db.query(`update tb_eva set total_commit=? where id_eva=?`,[sumRow.total,id_eva])
        if(detail_commit &&  detail_commit.trim()){
            await db.query(`update tb_commit set detail_commit=?,status_commit=? where id_eva=? and id_member=?`,[detail_commit,'y',id_eva,id_member])
        }
        const [commitRow] = await db.query(`select * from tb_commit where id_eva=? and status_commit=?`,[id_eva,'y'])
        if(commitRow.length === 3){
            await db.query(`update tb_eva set status_eva=? where id_eva=?`,[3,id_eva])
        }
        res.json({message:'POST Success!!'})
    }catch(err){
        console.error("Error POST Score",err)
    }
})

module.exports = router