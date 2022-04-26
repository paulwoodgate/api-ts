import { Schema, model } from 'mongoose';

export interface MessageDocument {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

const messageSchema = new Schema({
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

const Message = model<MessageDocument>('Message', messageSchema);
export default Message;