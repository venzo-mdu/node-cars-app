const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
        
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    car_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Cars",
    },
    user_availability:{
        type: String,
        required: [true, "Please add the user available"],
    }, 
    carname:{
        type : String,
        required:[true,"Please add car name"]
    },
    model: {
        type:String,
        required:[true,"Please add the model"]
    },
    year:{
        type:String,
        required:[true,"please add year"]
    },
    price:{
        type:String,
        required:[true,"please add price"]
    },
    image:{
        type:String
    },
    carnumber:{
        type:String,
        required:[true,"please add carnumber"]
    },
    enginecapacity:{
        type:String,
        required:[true,"please add enginecapacity"]
    },
    tyre:{
        type:String,
        required:[true,"please add tyre"]
    },
    fuel:{
        type:String,
        required:[true,"please add fuel"]
    },
    kilometer:{
        type:String,
        required:[true,"please add kilometer"]
    },
    powersteering:{
        type:String,
        required:[true,"please add powersteering"]
    }, 
    noofowners:{
        type:String,
        required:[true,"please add noofowners"]
    },

})
module.exports = mongoose.model("Book",bookingSchema);