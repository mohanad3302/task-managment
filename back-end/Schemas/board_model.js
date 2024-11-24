const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    boardID:{type : String , reqired :true},
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    tasks:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'task'
    }]
})


module.exports = mongoose.model('board' , BoardSchema)