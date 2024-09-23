const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required:[true , 'please add a name']
    },
    email :{
        type: String,
        required:[true , 'please add a email'],
        unique:true
    },
    password:{
        type: String,
        required:[true , 'please add a password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    },
    {
        timestamps:true
    })


    module.exports = mongoose.model('User' , userSchema)