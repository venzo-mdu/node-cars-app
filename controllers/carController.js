const Cars = require("../models/carModels");
const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;

//@desc get All cars
//@route api/cars/getAll
//@access public 
const getAllCars = asyncHandler(async (req, res) => {
    const cars = await Cars.find();
    if (!cars) {
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(cars);
});

//@desc get cars
//@route api/cars/
//@access private
const getCars = asyncHandler(async (req, res) => {
    //making route private 
    const cars = await Cars.find({ user_id: req.user.id });
    if (!cars) {
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

//@desc get one car
//@route api/cars/
//@access public
const createCars = asyncHandler(async (req, res) => {
    try{
    console.log(req.body.base64Image, "dta1");
        console.log(req.body.base64Image, "dta2");
        const uploadResult = await cloudinary.uploader.upload(req.body.base64Image);
        const imageUrl = uploadResult.secure_url;
        res.json({ imageUrl: uploadResult.secure_url })
            console.log("user id",req.user.id)
            const cars = Cars.create({
            user_id: req.user.id,
            carname: req.body.carname,
            model: req.body.model,
            year: req.body.year,
            price: req.body.price,
            carnumber: req.body.carnumber,
            image: imageUrl,
            enginecapacity: req.body.enginecapacity,
            tyre: req.body.tyre,
            fuel: req.body.fuel,
            powersteering: req.body.powersteering,
            noofowners: req.body.noofowners,
            kilometer: req.body.kilometer
        })
    }catch(error) {
        console.log(error);
}
});

//@desc book cars
//@route api/cars/booknow
//@access private
const bookCars = asyncHandler(async (req,res)=>{
    const cars = await Cars.findById(req.params.id);
    if(!cars){
        res.status(404);
        throw new Error("Car not found");
    }try{
        const book = new Book({
        user_id:req.user.id,
        cars:req.params.id,
        user_availability:req.body.user_availability,
        });
        const savedBooking = await book.save();
        console.log("Booking successfully");
        res.json({ message: 'Car Booking successful', bookingId: savedBooking._id });
    }catch(err){
        console.log("Error not booked",err);
    }
    // console.log("params id",req.params.id);
    // console.log("carnamee",cars.carname)
    // console.log("carname",req.params.id.carname);
    // console.log("cars is ",cars);
    // console.log("reqqqq",req.user.id);
    // console.log("cars id",cars.user_id);
});

//@desc booked cars list
//@route /api/cars/bookedList/:id
//@access private
const bookedList = asyncHandler(async(req,res)=>{
const userId = req.params.id;
try{
    //making the route private
    if (userId !== req.user.id) {
        res.status(403).json({message:"Token user ID does not match"});
        throw new Error("You can't see other persons bookings");
    }
    const bookedCars = await Book.find({ user_id : userId }).populate('cars');
    if (bookedCars.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this car.' });
    }
    console.log(bookedCars);
    res.json(bookedCars);
}catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
}
// const tokenUser = req.user.id;
// console.log("user id",userId);
// console.log("tokwn user id",tokenUser)
// console.log("requested url is",req.originalUrl);
});

//@desc delete booked cars
//@route /api/cars/book/:id
//@access private
const deleteBookedCars = asyncHandler(async (req, res) => {
    console.log("params",req.params.id);
    const book = await Book.findById(req.params.id);
    console.log("booking",book)
    if (!book) {
        res.status(404);
        throw new Error("No bookings found for the user");
    }

    // making route private
    if (book.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont't have permission to delete other user bookings")
    }
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({message:"Deleted Succesfully"});

});

//@desc get one car
//@route api/cars/:id
//@access private
const getCarByid = asyncHandler(async (req, res) => {
    //making route private
    const cars = await Cars.find({ user_id: req.user.id });
    console.log("cars",cars);
    if(!cars){
        res.status(403);
        throw new Error("User not authorized");
    }
    const carsById = await Cars.findById(req.params.id);
    // user_id: req.user.id
    if (!cars) {
        res.status(404);
        throw new Error("car not found");
    }
    res.status(200).json(carsById);
});

//@desc update cars
//@route api/cars/:id
//@access private
const updateCars = asyncHandler(async (req, res) => {
    const cars = await Cars.findById(req.params.id);
    //console.log(contact);
    if (!cars) {
        res.status(404);
        throw new Error("Cars not found");
    }
    //console.log("reqest bdy",req.body);
    //making route private
    if (cars.user_id.toString() !== req.user.id) {
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
const deleteCars = asyncHandler(async (req, res) => {
    console.log("inside car controller 1");
    const cars = await Cars.findById(req.params.id);
    console.log(cars)
    if (!cars) {
        res.status(404);
        throw new Error("car not found");
    }

    //making route private
    if (cars.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont't have permission to delete other user details")
    }
    await Cars.deleteOne({ _id: req.params.id });
    res.status(200).json({message:"Deleted Succesfully"});

});

module.exports = { getAllCars, createCars, getCars, getCarByid, updateCars, deleteCars,bookCars,bookedList,deleteBookedCars };