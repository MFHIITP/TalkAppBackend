import mongoose from "mongoose";

const allMessagesSchema = new mongoose.Schema ({
    index: {
        type: Date,
        default: new Date()
    },
    chatname: {
        type: String,
        required: true
    },
    query: {
        type: String,
    },
    response: {
        type: String,
    }
})

export const allMessagesModel = mongoose.model("allMessagesModel", allMessagesSchema);