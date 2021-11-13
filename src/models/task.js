const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
   
    completed: {
        type: Boolean,
        default: false
    },
    assignedUser: {
        type: String,
        required: true,
        trim: true
    },
    createdUser: {
        type: String,
        required: true,
        trim: true
    },
    commentTask:{
        type: String,
        required: false,
        trim: true
    }
})

module.exports = Task