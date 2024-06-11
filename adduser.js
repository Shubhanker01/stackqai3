const express = require('express')
const router = express.Router()
router.use(express.json())
const user = require('../Schemas/user')

router.post('/', async (req, res) => {
    await user.create({
        "name": req.body.name,
        "email": req.body.email,
        "is_verified": req.body.is_verified
    }).then(response => {
        res.send(response)
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router