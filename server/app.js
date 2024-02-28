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

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
