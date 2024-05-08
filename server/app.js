const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 6969
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI)
mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo')
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

module.exports = app; // Export the app for testing
