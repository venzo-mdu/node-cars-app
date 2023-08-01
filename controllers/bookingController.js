const Cars = require("../models/carModels");
const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

//@desc book cars
//@route api/book/
//@access private
const bookCars = asyncHandler(async (req,res)=>{
    const user = req.user.id;
    const cars = await Cars.findById(req.params.id);
    console.log("cars",cars)
    if(!cars){
        res.status(404);
        throw new Error("Car not found");
    }
    if(cars.user_id.toString() === user){
        res.status(409).json({ message:`You can't book your own car`})

    }
    const isCarAlreadyBooked = await Book.exists({
        cars:cars,
        user_id:user

    })
    if(isCarAlreadyBooked){
        return res.status(409).json({ message: 'Car is already booked by you, check your bookings' });
    }
    try{
        const book = new Book({
        user_id:req.user.id,
        cars:req.params.id,
        user_availability:req.body.user_availability,
        contact_no:req.body.contact_no
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
//@route /api/book/:id
//@access private
const bookedList = asyncHandler(async(req,res)=>{
const userId = req.params.id;
try{
    //making the route private
    if (userId !== req.user.id) {
        res.status(403).json({message:"Token user ID does not match"});
        throw new Error("You can't see other persons booked cars");
    }
    const bookedCars = await Book.find({ user_id : userId }).populate('cars');
    if (bookedCars.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this car.' });
    }
    // console.log(bookedCars);
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

//@desc my cars is booked
//@route /api/book/check/:id
//@access private
const myCarIsBooked = asyncHandler(async (req, res) => {
    console.log("params id",req.params.id);
    const carId = req.params.id;
    const userId = req.user.id;
    const cars = await Cars.findById(carId);
    console.log(cars);

    //making route private 
    if(cars.user_id.toString() !== userId ){
        res.status(403).json({message:"Token does not match, You can't see other persons car booking details"});
        throw new Error("You can't see other persons car bookings");
    }
    const bookedCars = await Book.find({ cars : carId }).populate('user_id','username contact_no');
    if (bookedCars.length === 0) {
        return res.status(404).json({ message: 'Wait!, still your car is not booked' });
    }
    console.log(bookedCars);
    res.status(200).json({ message: 'Your car is booked by the user:' ,bookedCars});
});


//@desc delete booked cars
//@route /api/book/:id
//@access private
const deleteBookedCars = asyncHandler(async (req, res) => {
    console.log("params",req.params.id);
    const book = await Book.findById(req.params.id);
    console.log("booked car",book)
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

module.exports = {bookCars,bookedList,deleteBookedCars,myCarIsBooked}