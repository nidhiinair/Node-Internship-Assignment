const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
})


const Task = new mongoose.model('Task', taskSchema)

module.exports = Task