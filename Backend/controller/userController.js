const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register new User
// @route  POST /api/users
// @access Public
const RegisterUser = asyncHandler (async (req, res) =>{
    const {name , email , password , role} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please input all data')
    }

    // checking whether the user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    })

    if(user){
        res.status(201)
        res.json({
            _id : user.id,
            name : user.name,
            email: user.email,
            role:user.role,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User data')

    }
})





// @desc Login as User
// @route  POST /api/users/login
// @access Public
const LoginUser = asyncHandler (async (req, res) =>{
    const {email , password } = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password , user.password))){
        res.status(200)
        res.json({
            _id :user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid login credentials')
    }
})






// @desc Get User info
// @route  GET /api/users/me
// @access Private
const GetME = asyncHandler (async (req, res) =>{

    
    const user = await User.findById(req.user.id)

    //checking whether the user exists
    if(!user){
        res.status(404);
        throw new Error('User not found')
    }

    const {_id , name , email , role } = user

    res.status(200)
    res.json({
        id:_id,
        name,
        email,
        role

    })
})


// JWT Token generation
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET ,{
        expiresIn:'30d'
    })
}


module.exports = { RegisterUser , LoginUser ,GetME }