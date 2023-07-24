const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            reuired:true,
            ref:"User",
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
        image :{ 
            type:String,
            required:[true,"please add image"]
    }
});
module.exports = mongoose.model("Cars",carSchema);