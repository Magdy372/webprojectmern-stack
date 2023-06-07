import mongoose from "mongoose";

const newselterSchema = mongoose.Schema({
    mail: {
        type: String,
        required:true,
      
    },
    name:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const newselter = mongoose.model('newselter', newselterSchema);

export default newselter;