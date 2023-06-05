import mongoose from "mongoose";

const Schema = mongoose.Schema;

const order_schema = new Schema({
    shipping_address: {
        country: {
            type: String,
            required: [true, "Country is required"]
        },
        city: {
            type: String,
            required: [true, "City is required"]
        },
        street: {
            type: String,
            required: [true, "Street is required"]
        },
        building:{
            type: String,
            required: [true, "Building No. is required"]
        },
        floor:{
            type: String,
            required: [true, "Floor No. is required"]
        }
    },
    order_total: {
        type: Number,
        required: [true, "Order total is required"],
        min: [0, "Order total must be a positive number"]
    },
    order_status: {
        type: String,
        required: [true, "Order status is required"]
    }
}, { timestamps: true });

const Order = mongoose.model("Order", order_schema);

export default Order;