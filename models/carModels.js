const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
        // user_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     reuired:true,
        //     ref:"User",
        // },
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
        image:{
            type:String
        }
        // price:{
        //     type:String,
        //     required:[true,"please add price"]
        // },
        // carnumber:{
        //     type:String,
        //     required:[true,"please add carnumber"]
        // },
        // enginecapacity:{
        //     type:String,
        //     required:[true,"please add enginecapacity"]
        // },
        // tyre:{
        //     type:String,
        //     required:[true,"please add tyre"]
        // },
        // fuel:{
        //     type:String,
        //     required:[true,"please add fuel"]
        // },
        // kilometer:{
        //     type:String,
        //     required:[true,"please add kilometer"]
        // },
        // transmission:{
        //     type:String,
        //     required:[true,"please add transmission"]
        // },
        // powersteering:{
        //     type:String,
        //     required:[true,"please add powersteering"]
        // }, 
        // noofowners:{
        //     type:String,
        //     required:[true,"please add noofowners"]
        // },
    //     image :{ 
    //         type: String
    // },
});
module.exports = mongoose.model("Cars",carSchema);