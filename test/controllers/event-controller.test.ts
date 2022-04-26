'use strict';

import {startOfToday, getYear, addYears} from 'date-fns';
import express, { Express } from 'express';
import eventRoutes from '../../src/routes/event-routes';
import * as dbHandler from '../db-handler';

import request from 'supertest';
import Event from '../../src/data/event-document';

let app: Express;
const thisYear = getYear(startOfToday());
const date1 = addYears(new Date(thisYear, 10, 22), 1);
const date2 = addYears(new Date(thisYear, 9, 22), 1);
const date3 = addYears(new Date(thisYear, 10, 22), 2);

const event1 = { id: 123, type: 'Walk', title: 'Event 1', date: date1 };
const event2 = { id: 433, type: 'Walk', title: 'Event 2', date: date2 };
const event3 = { id: 865, type: 'Walk', title: 'Event 3', date: date3 };

beforeAll(async () => {
  await dbHandler.connect();
  app = express();
  app.use('/api/events', eventRoutes);
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('Event Controller Tests', () => {
  describe('getAllEvents', () => {
    test('Should return status 200 with items', async () => {
      Event.insertMany([event1, event2]);

      const response = await request(app).get('/api/events').expect(200);
      const events = response.body;
      expect(events.length).toBe(2);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Event).toReturn(new Error('Error finding'), 'find');

    //   await request(app).get('/api/events').expect(500);
    // });
  });

  describe('getUpcomingEvents', () => {
    test('Should return status 200 with items', async () => {
      Event.insertMany([event1, event3]);

      const response = await request(app).get('/api/events/upcoming').expect(200);
      const results = response.body;

      expect(results.events).toBeDefined();
      expect(results.months).toBeDefined();
      expect(results.events.length).toBe(2);
      // expect(results.events[0].date).toBe('Sunday 22nd November');
      expect(results.events[0].month).toBe(`${thisYear + 1}/11`);
      expect(results.months.length).toBe(3);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Event).toReturn(new Error('Error finding'), 'find');

    //   await request(app).get('/api/events/upcoming').expect(500);
    // });
  });

  describe('getUpcomingSummary', () => {
    test('Should return status 200 with items', async () => {
      Event.insertMany([event1, event2]);

      const response = await request(app).get('/api/events/summary').expect(200);
      const events = response.body;
      expect(events.length).toBe(2);
      expect(events[0].length).toBeUndefined();
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Event).toReturn(new Error('Error finding'), 'find');

    //   await request(app).get('/api/events/summary').expect(500);
    // });
  });

  describe('getEvent', () => {
    test('Should return status 200 with item', async () => {
      Event.insertMany([event1, event2, event3]);
      const response = await request(app).get('/api/events/123').expect(200);
      const event = response.body;
      expect(event.title).toBe('Event 1');
    });

    test('Should return status 404 if not found', async () => {
      Event.insertMany([event1, event2, event3]);
      await request(app).get('/api/events/1').expect(404);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Event).toReturn(new Error('Error finding'), 'findOne');

    //   await request(app).get('/api/events/1').expect(500);
    // });
  });
});
