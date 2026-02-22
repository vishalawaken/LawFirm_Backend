const mongoose=require("mongoose")

const consultationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    practiceArea:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","contacted","closed"],
        default:"pending"
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("Consultation",consultationSchema)