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

    currentServingToken:{
        type:Number,
        default:0,

    },

    averageServiceTime:{
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

const Queue=mongoose.model("Queue",queueSchema)
module.exports=Queue;