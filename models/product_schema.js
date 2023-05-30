import mongoose from "mongoose";

const Schema = mongoose.Schema;

const product_schema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    brand: {
        type: String,
        required: [true, "Brand is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description should be at least 10 characters long"]
    }
}, { timestamps: true });

const Product = mongoose.model("Product", product_schema);

export default Product;