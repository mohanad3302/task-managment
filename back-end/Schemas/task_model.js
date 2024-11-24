const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title : {type:String , required : true},
    description : {type:String},
    status:{type :String},
    estimate : {type : String , required : true},
    tags:[{type :String}],
    assignee :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    board : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board'
    }
})


module.exports = mongoose.model('Task' , TaskSchema)