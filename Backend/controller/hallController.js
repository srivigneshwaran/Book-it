const asyncHandler = require('express-async-handler')
const Hall = require('../model/hallModel')
const User = require('../model/userModel')

// @desc Get hall
// @route  GET /api/hall
// @access to all users


const getHalls = asyncHandler (  async (req , res) =>{
    const halls = await Hall.find();
    res.status(200).json(halls);
})

// @desc Create hall
// @route  POST /api/hall
// @access Admin

const createHall =  asyncHandler (  async (req , res) =>{
   const {name , capacity , location ,amenities ,contactNumber,inChargePerson } = req.body

   if(!name || !capacity || !location){
        res.status(400)
        throw new Error('Input all values')
   }

   const hallExists = await Hall.findOne({name})

   if(hallExists){
        res.status(400)
        throw new Error('Hall already exists')
   }

   const newHall = await Hall.create({
        name,
        capacity,
        location,
        amenities,
        contactNumber,
        inChargePerson
   })

   res.status(200).json(newHall)

} )

// @desc update hall
// @route  PUT /api/hall/:id
// @access Admin

const updateHall = asyncHandler (  async (req , res) =>{

    //checking whether the hall exists
    const hall = await Hall.findById(req.params.id)

    if(!hall){
        res.status(400)
        throw new Error('hall not found')
    }

    //updating 
    const updatedHall = await Hall.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    res.status(200).json(updatedHall)
})



// @desc Delete hall
// @route  DELETE /api/hall/:id
// @access Admin

const deleteHall = asyncHandler (  async (req , res) =>{
    // Checking whether the hall exists
     const hall = await Hall.findById(req.params.id)

     if(!hall){
         res.status(400)
         throw new Error('hall not found')
     }

    // Deleting 
    await hall.deleteOne()

    res.status(200)
    res.json({
        id:req.params.id
    })
    
})



module.exports ={ 
    getHalls,
    createHall,
    updateHall,
    deleteHall 
}