const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler ( async (req , res , next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //getting the token from the header
            token = req.headers.authorization.split(' ')[1]

            //verifying the token and decoding it
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            //getting the corresponding user by using the decoded token
            //getting all user details except the password
            req.user = await User.findById(decoded.id).select('-password') 

            next()

        } 
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized access')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Unauthorized access')
    }
})


module.exports = { protect }