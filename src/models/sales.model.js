import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
      },
      topics: {
        type: [String],
        required: true
      },
      sales: {
        type: Number,
        required: true
      }
});

export const Sales = mongoose.model("Sales", salesSchema);
