import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
      
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem