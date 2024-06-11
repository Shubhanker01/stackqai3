const express = require('express')
const router = express.Router()

router.use(express.json())

const ques = require('../Schemas/ques')
const user = require('../Schemas/user')

// using post method
router.post('/', async function (req, res) {
    try {
        let data = await user.findOne({ email: req.body.email }).exec()
        await ques.create({
            "user_id": data._id,
            "question": req.body.question
        }).then(() => {
            res.send("successfully saved to database")
        }).catch(err => console.log(err))
    }
    catch (err) {
        res.send(err)
    }

})

module.exports = router