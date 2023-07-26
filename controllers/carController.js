const Cars = require("../models/carModels");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;

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

cloudinary.config({ 
    cloud_name: 'dph227bch', 
    api_key: '671337158813626', 
    api_secret: 'ItaSlE_wJILfAnc6855VfZil09g',
    secure: true
  });

//@desc create car
//@route api/cars/
//@access private
const createCars = asyncHandler(async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    console.log(req.body);
    console.log(req.file);
    await Cars.create({
    user_id:req.user.id,
    carname:req.body.carname,
    model:req.body.model,
    year:req.body.year,
    price:req.body.price,
    carnumber:req.body.carnumber,
    enginecapacity:req.body.enginecapacity,
    tyre:req.body.tyre,
    fuel:req.body.fuel,
    powersteering:req.body.powersteering,
    noofowners:req.body.noofowners,
    kilometer:req.body.kilometer,
    image:imageUrl
    
}).then((res)=>{
    console.log("image and details saved success")
}).catch((err)=>{
    console.log(err,"error has occured")
});
res.send('Image and details saved successfully');
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