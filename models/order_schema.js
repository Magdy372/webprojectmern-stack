import mongoose from "mongoose";
const schema = mongoose.Schema;


const order_schema = new schema({

    shipping_address:{
        coutry:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        Street:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        }
    },

    order_total:{
       type:Number,
       required:true
    },

    order_status:{
       type:String,
       required:true
    }

} , { timestamps: true })


const order = mongoose.model("orderlist",order_schema);
 

export default order