const db = require('./db');
const express = require('express');
const mongoose=require('mongoose')

const app=express()
const port=4000

//using middleware
app.use(express.json())

//Avaliable Routes
app.use('/api/student',require('./routes/student'));


app.listen(port,()=>{
    console.log(`Server listening at http:localhost:${port}`)
})