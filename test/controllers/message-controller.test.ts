'use strict';

// import 'regenerator-runtime/runtime';
import express from 'express';
import messageRoutes from '../../src/routes/message-routes';

import request from 'supertest';
import Message from '../../src/data/message-document';
import Email from '../../src/utils/email-service';
import * as dbHandler from '../db-handler';

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

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

    const response = await request(app).post('/api/messages').send({
      name: 'Fred Bloggs',
      email: 'Fred.bloggs@gmail.com',
      message: 'Hello'
    });
    expect(response.status).toBe(200);
    expect(Email.sendEmail).toBeCalledTimes(1);

    const savedMsg = await Message.findOne({email:'Fred.bloggs@gmail.com'}).exec();
    expect(savedMsg).not.toBeNull();

    Email.sendEmail = original;
  });

  test('should return a status code of 500 if sending the email fails', async () => {
    const original = Email.sendEmail;
    Email.sendEmail = jest.fn(() => Promise.resolve(false));

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
