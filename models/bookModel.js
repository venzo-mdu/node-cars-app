const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
        
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    cars:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Cars"
    },
    user_availability:{
        type: String,
        required: [true, "Please enter the date of available"],
    }
   
});

// bookingSchema.index({ cars: 1 }, { unique: true });

module.exports = mongoose.model("Book",bookingSchema);