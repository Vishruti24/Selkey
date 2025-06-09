
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    roll_no:{
        type : Number,
        required : true,
        unique : true
    },
    course:{
        type : String,
        required : true
    },
    // date:{
    //     type : Date,
    //     default : Date.now
    // },  
})

// student.createIndexes();
const student = module.exports = mongoose.model('student',studentSchema);
