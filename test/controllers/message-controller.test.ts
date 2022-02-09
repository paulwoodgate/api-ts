'use strict';

import 'regenerator-runtime/runtime';
import express from 'express';
import messageRoutes from '../routes/message-routes';

import request from 'supertest';
const mockingoose = require('mockingoose');
import Message from '../models/message-model';
import Email from '../services/email-service';

describe('Message Controller Tests', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/messages', messageRoutes);

  test('should reject an invalid message returning a status code of 500', async () => {
    const response = await request(app).post('/api/messages').send({ name: 'Fred Bloggs', message: 'Hello' });
    expect(response.status).toBe(500);
    expect(response.text).toContain('Please enter your email');
  });

  test('should save a valid message returning a status code of 200', async () => {
    const original = Email.sendEmail;
    Email.sendEmail = jest.fn(() => Promise.resolve(true));

    mockingoose(Message).toReturn(
      { name: 'Fred Bloggs', email: 'Fred.bloggs@gmail.com', message: 'Hello' },
      'save'
    );

    const response = await request(app).post('/api/messages').send({
      name: 'Fred Bloggs',
      email: 'Fred.bloggs@gmail.com',
      message: 'Hello'
    });
    expect(response.status).toBe(200);
    expect(Email.sendEmail).toBeCalledTimes(1);

    Email.sendEmail = original;
  });

  test('should return a status code of 500 if sending the email fails', async () => {
    const original = Email.sendEmail;
    Email.sendEmail = jest.fn(() => Promise.resolve(false));

    mockingoose(Message).toReturn(
      { name: 'Fred Bloggs', email: 'Fred.bloggs@gmail.com', message: 'Hello' },
      'save'
    );

    const response = await request(app).post('/api/messages').send({
      name: 'Fred Bloggs',
      email: 'Fred.bloggs@gmail.com',
      message: 'Hello'
    });
    expect(response.status).toBe(500);
    expect(Email.sendEmail).toBeCalledTimes(1);

    Email.sendEmail = original;
  });
});
