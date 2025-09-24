import mongoose from "mongoose";
import config from "../config.js";

const server = config.SERVER;
const database = config.DATABASE;

(async() => {
    try {
        const mongoURI = `mongodb+srv://${server}/${database}?retryWrites=true&w=majority`;
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to MongoDB");
    }
    catch(error) {
        console.error("Error connecting to mongoDB", error);
    }
})();