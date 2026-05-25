const mongoose =require("mongoose");

const queueSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    currentToken:{
        type:Number,
        default:0,
    },

    averageserviceTime:{
        type:Number,
        default:5,
    },

    isActive:{
        type:Boolean,
        default:true,
    },
},

{timestamps:true,

}
)

module.exports=mongoose.exports("Queue",queueSchema);