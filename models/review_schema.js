import mongoose from "mongoose";
const schema = mongoose.Schema;


const review_Schema = new schema({
    reviewer_name:{
        type:String,
        
    },

    review:{
        type:String,
        required:true
    },

    rate:{
        type:Number,
        max: [5,"can not rate an item higher than 5"],
        min: [1,"can not rate an item lower than 0"]
    }

}, { timestamps: true })


const category = mongoose.model("Review",review_Schema);
 

export default category 