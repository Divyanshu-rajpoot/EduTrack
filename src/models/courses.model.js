import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    topics: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    continent: {
        type: String,
        required: true
    }
});

export const Course = mongoose.model("Course", courseSchema);
