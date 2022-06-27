"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'That is not a valid email address'],
    },
    message: {
        type: String,
        required: [true, 'Please enter a message'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.default = Message;
//# sourceMappingURL=message-document.js.map