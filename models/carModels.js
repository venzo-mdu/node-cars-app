const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
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
        }
    }
)
module.exports = mongoose.model("Cars",carSchema);