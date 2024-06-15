const express = require('express')
const router = express.Router()

const quesans = require('../Schemas/quesans')
const user = require('../Schemas/user')

router.use(express.json())

// save question answers
router.post('/', async function (req, res) {
    try {
        const data = await user.findOne({ email: req.body.email }).exec()
        await quesans.create({
            "user_id": data._id,
            "question": req.body.question,
            "answer": req.body.answer,
            "date":Date
        }).then(() => {
            res.send("Saved successfully")
        }).catch((err) => {
            res.send(err)
        })

    }
    catch (err) {
        res.send(err)
    }
})

router.post('/history', async function (req, res) {
    try {
        let data = await user.findOne({ email: req.body.email })
        let response = await quesans.find({ user_id: data._id })
        let results = response.map(function (result) {
            let obj = {
                "_id":result._id,
                "question": result.question,
                "answer": result.answer
            }
            return obj
        })
        res.send(results)
    }
    catch (err) {
        res.send(err)
    }
})
module.exports = router