const express = require('express')
const router = express.Router()

const quesans = require('../Schemas/quesans')
const user = require('../Schemas/user')

router.use(express.json())

// save question answers
router.post('/', async function (req, res) {
    try {
        let date = new Date()
        const data = await user.findOne({ email: req.body.email }).exec()
        await quesans.create({
            "user_id": data._id,
            "question": req.body.question,
            "answer": req.body.answer,
            "date": date
        }).then(() => {
            quesans.markModified('date')
            quesans.bulkSave()
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
        // sorting according to dates
        response.sort(function (a, b) {
            return b.date.getTime() - a.date.getTime()
        })
        let results = response.map(function (result) {
            let weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
            let day = result.date.getDay()
            let newDate = result.date.toLocaleDateString()
            let obj = {
                "_id": result._id,
                "user_id": result.user_id,
                "question": result.question,
                "answer": result.answer,
                "date": `${weekday[day]}, ${newDate}`
            }
            return obj
        })
        res.send(results)
    }
    catch (err) {
        res.send(err)
    }
})

// delete a specific question answer
router.delete('/delete/:id', async function (req, res) {
    try {
        await quesans.findByIdAndDelete(req.params.id)
        res.send("deleted successfully")
    }
    catch (err) {
        res.send(err)
    }
})

// delete all the chats of the user with the bot
router.delete('/delete/all/:userId', async function (req, res) {
    try {
        await quesans.deleteMany({ user_id: req.params.userId })
        res.send("All the documents successfully deleted")
    }
    catch (err) {
        res.send(err)
    }
})



module.exports = router