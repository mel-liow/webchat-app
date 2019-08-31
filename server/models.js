const mongoose = require("mongoose");


const User = mongoose.model("User", {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
});

const Message = mongoose.model("Mesage", {
    message: String,
    senderEmail: String,
    receiverEmail: String,
    timestamp: Number
});


module.exports = { User, Message };