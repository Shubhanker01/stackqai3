const express = require('express')
const router = express.Router()

const quesans = require('../Schemas/quesans')
const user = require('../Schemas/user')

router.use(express.json())

router.post('/',async function(req,res){
    try{
        const data = await user.findOne({email:req.body.email}).exec()
        await quesans.create({
            "user_id":data._id,
            "question":req.body.question,
            "answer":req.body.answer
        }).then(()=>{
            res.send("Saved successfully")
        }).catch((err)=>{
            res.send(err)
        })
        
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router