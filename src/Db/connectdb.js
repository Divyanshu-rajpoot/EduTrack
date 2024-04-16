import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DBNAME}`);
        console.log(`MongoDB Connected: ${connectioninstance.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;