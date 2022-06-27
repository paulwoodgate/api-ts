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
const report4 = { id: '4', title: 'Report 4', date: '2020-10-22T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2020, subjectType: 'Day' };
const report5 = { id: 'test', title: 'Group Report', date: '2022-10-22T00:00:00.000Z', endDate: '2022-10-23T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2022, subjectType: 'Group' };
const report6 = { id: 'test-1', title: 'Day Report 1', date: '2022-10-22T00:00:00.000Z', walkRating: 'Good', reportBy: 'Paul', year: 2022, subjectType: 'Day' };

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
  });

  describe('getYearReports', () => {
    test('Should return status 200 with items', async () => {
      Report.insertMany([report1, report2, report3]);

      const response = await request(app).get('/api/reports/2020').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
    });
    test('Should not return day reports', async () => {
      Report.insertMany([report1, report2, report4]);

      const response = await request(app).get('/api/reports/2020').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
      expect(reports[0].id).toBe('2');
      expect(reports[1].id).toBe('1');
    }); 
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

    test('Should return day reports within Group', async () => {
      Report.insertMany([report5, report6]);

      const response = await request(app).get('/api/reports/detail/test').expect(200);
      const report = response.body;
      const dayReport = report.days[0];
      
      expect(report.title).toBe('Group Report');
      expect(report.days.length).toBe(1);
      expect(dayReport.title).toBe('Day Report 1');
      expect(dayReport.formattedDate).toBe('Saturday 22nd October');
    });
  });
});
