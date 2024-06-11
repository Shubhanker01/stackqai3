const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose')
const cors = require('cors')

const user = require('./Routes/adduser')
const ques = require('./Routes/ques')
const ans = require('./Routes/ans')

app.use(express.json())
app.use(cors())

// routes
app.get('/', function () {
  console.log("hello world")
})
app.use('/user', user)
app.use('/ques',ques)
app.use('/ans',ans)

app.listen(port, function () {
  console.log(`Example app listening on port:${port}`)
})

mongoose.connect('mongodb+srv://shubhanker40:bca02092001@cluster1.ivvgywy.mongodb.net/stackqai')