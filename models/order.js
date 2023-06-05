import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    buildingno: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})


const Order = mongoose.model('Order', orderSchema);

export default Order
