"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
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
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
//# sourceMappingURL=message-model.js.map