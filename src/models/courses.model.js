import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },

});

export const Course = mongoose.model("Course", courseSchema);
