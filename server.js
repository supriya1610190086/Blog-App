const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const details = require('./routes/router')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', details)

app.listen(5000, () => {
    console.log('server working on port ${port}');
})