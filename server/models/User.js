const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    plan: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Place" 
            }
        ],
});

module.exports = mongoose.model("User", userSchema);