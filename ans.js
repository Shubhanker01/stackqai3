const express = require('express')
const router = express.Router()
router.use(express.json())

const ques = require('../Schemas/ques')
const ans = require('../Schemas/ans')

router.post('/:quesId',async function(req,res){
   try{
      let data = await ques.findById(req.params.quesId)
      res.send(data)
   }
   catch(err){
      res.send(err)
   }
})

module.exports = router