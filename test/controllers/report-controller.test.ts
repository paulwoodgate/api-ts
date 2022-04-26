'use strict';

import express, { Express } from 'express';
import reportRoutes from '../../src/routes/report-routes';
import request from 'supertest';
import * as dbHandler from '../db-handler';
import { Report } from '../../src/data/report-document';

let app: Express;
const report1 = { id: '1', title: 'Report 1', date: '2020-11-22T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2020 };
const report2 = { id: '2', title: 'Report 2', date: '2020-10-22T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2020 };
const report3 = { id: '3', title: 'Report 3', date: '2021-10-22T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2021 };

beforeAll(async () => {
  await dbHandler.connect();
  app = express();
  app.use('/api/reports', reportRoutes);
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('Report Controller Tests', () => {
  describe('getAllReports', () => {
    test('Should return status 200 with items', async () => {
      Report.insertMany([ report1, report2 ]);

      const response = await request(app).get('/api/reports').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Report).toReturn(new Error('Error finding'), 'find');

    //   await request(app).get('/api/reports').expect(500);
    // });
  });

  describe('getReportYears', () => {
    test('Should return status 200 with items', async () => {
      Report.insertMany([report1, report3]);

      const response = await request(app).get('/api/reports/years').expect(200);
      const years = response.body;
      expect(years.length).toBe(2);
      expect(years[0]).toBe(2020);
      expect(years[1]).toBe(2021);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Report).toReturn(new Error('Error finding'), 'distinct');

    //   await request(app).get('/api/reports/years').expect(500);
    // });
  });

  describe('getYearReports', () => {
    test('Should return status 200 with items', async () => {
      Report.insertMany([report1, report2, report3]);

      const response = await request(app).get('/api/reports/2020').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Report).toReturn(new Error('Error finding'), 'find');

    //   await request(app).get('/api/reports/2020').expect(500);
    // });
  });

  describe('getReport', () => {
    test('Should return status 200 with item', async () => {
      Report.insertMany([report1, report2, report3]);

      const response = await request(app).get('/api/reports/detail/1').expect(200);
      const report = response.body;
      expect(report.title).toBe('Report 1');
    });

    test('Should return status 404 if not found', async () => {
      Report.insertMany([report1, report2, report3]);

      await request(app).get('/api/reports/detail/10').expect(404);
    });

    // test('Should return status 500 if error', async () => {
    //   mockingoose(Report).toReturn(new Error('Error finding'), 'findOne');

    //   await request(app).get('/api/reports/detail/1').expect(500);
    // });
  });
});
