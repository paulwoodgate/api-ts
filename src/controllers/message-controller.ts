import Message from '../data/message-document';
import Email from '../utils/email-service';
import { Request, Response } from 'express';

export const createMessage = async (req: Request, res: Response) => {
  const data = req.body;
  const message = new Message({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  try {
    const savedMsg = await message.save();

    const success = await Email.sendEmail(message);
    if (!success) {
      res.status(500).json('An error occurred sending the email');
      return;
    }

    res.status(200).json(savedMsg);
  } catch (error) {
    // console.log('Error', error);
    res.status(500).json(error);
  }
};
