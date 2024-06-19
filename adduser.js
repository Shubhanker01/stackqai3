const express = require('express')
const router = express.Router()
router.use(express.json())
const user = require('../Schemas/user')

router.post('/', async (req, res) => {
    // check if the user already exists
    const query = await user.findOne({ email: req.body.email }).exec()
    // query==null means user does not exist
    if (query == null) {
        await user.create({
            "name": req.body.name,
            "email": req.body.email,
            "is_verified": req.body.is_verified
        }).then(response => {
            res.send(response)
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.send(query)
    }


})


module.exports = router