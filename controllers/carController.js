const Cars = require("../models/carModels");
const asyncHandler = require("express-async-handler");
const carModels = require("../models/carModels");
//const upload = require("../middleware/uploadImageHandler")

//@desc get All cars
//@route api/cars/getAll
//@access public 
const getAllCars = asyncHandler(async(req,res)=>{
    const cars = await Cars.find();
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

//@desc get cars
//@route api/cars/
//@access private
const getCars = asyncHandler(async(req,res)=>{
    //making route private 
    const cars = await Cars.find({user_id: req.user.id});
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

//@desc create car
//@route api/cars/
//@access private
const createCars = asyncHandler(async(req,res,next)=>{
        console.log(req.body);
        console.log(req.file);
        const car =  new Cars({
        carname:req.body.carname,
        model:req.body.model,
        year:req.body.year,
        image:req.file.filename,
        user_id:req.user.id 
    });
    car.save()
    .then(result =>{
        console.log(result);
        res.status(200).json();
    })
    });
    
//@desc get one car
//@route api/cars/:id
//@access private
const getCarByid = asyncHandler(async(req,res)=>{
    //making route private
    const cars = await Cars.findById(req.params.id);
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

//@desc update cars
//@route api/cars/:id
//@access private
const updateCars = asyncHandler(async(req,res)=>{
    const cars = await Cars.findById(req.params.id);
    //console.log(contact);
    if(!cars){
        res.status(404);
        throw new Error("Cars not found");
    }
    //console.log("reqest bdy",req.body);
    //making route private
    if(cars.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("User dont't have permission to update other user details")
    }

    const updatedCars = await Cars.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    
    res.status(200).json(updatedCars);
});

//@desc delete cars
//@route api/cars/:id
//@access private
const deleteCars = asyncHandler(async(req,res)=>{
    console.log("inside car controller 1");
    const cars = await Cars.findById(req.params.id);
    console.log(cars)
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }

    //making route private
    if(cars.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("User dont't have permission to delete other user details")
    }
    await Cars.deleteOne({ _id: req.params.id });
    res.status(200).json(cars);

});

module.exports = {getAllCars,createCars,getCars,getCarByid,updateCars,deleteCars};