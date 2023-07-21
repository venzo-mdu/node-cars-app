const Cars = require("../models/carModels");
const asyncHandler = require("express-async-handler");

//@desc get All cars
//@route api/cars/
//@access public
const getCars = asyncHandler(async(req,res)=>{
    const cars = await Cars.find();
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

module.exports = getCars;

//@desc create cars
//@route api/cars/
//@access public
const createCars = asyncHandler(async(req,res)=>{
    
        console.log("request body is",req.body);
        const {carname,model,year} = req.body;
        if(!carname ||!model ||!year){
            res.status(400);
            throw new Error("All fields are mandatory !");
        }
        const cars = await Cars.create({
            carname,
            model,
            year
        });
        res.status(200).json(Cars);
    });

//@desc get one cars
//@route api/cars/
//@access public
const getCarByid = asyncHandler(async(req,res)=>{
    const cars = await Cars.findById(req.params.id);
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

//@desc update contacts
//@route api/contacts/1
//@access public
const updateCars = asyncHandler(async(req,res)=>{
    const cars = await Cars.findById(req.params.id);
    //console.log(contact);
    if(!cars){
        res.status(404);
        throw new Error("Cars not found");
    }
    //console.log("reqest bdy",req.body);
    
    const updatedCars = await Cars.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    
    res.status(200).json(updatedCars);
});

const deleteCars = asyncHandler(async(req,res)=>{
    console.log("inside car controller 1");
    const cars = await Cars.findById(req.params.id);
    console.log(cars)
    if(!cars){
        res.status(404);
        throw new Error("car not found");
    }
    await Cars.deleteOne({ _id: req.params.id });
    res.status(200).json(cars);

});

module.exports = {createCars,getCars,getCarByid,updateCars,deleteCars};