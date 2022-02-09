'use strict';

import 'regenerator-runtime/runtime';
import express from 'express';
import reportRoutes from '../../src/routes/report-routes';
import request from 'supertest';
const mockingoose = require('mockingoose');
import Report from '../models/report-model';

let app;

beforeAll(() => {
  app = express();
  app.use('/api/reports', reportRoutes);
});

describe('Report Controller Tests', () => {
  describe('getAllReports', () => {
    test('Should return status 200 with items', async () => {
      mockingoose(Report).toReturn(
        [
          { id: '1', title: 'Report 1', date: '2020-11-22T00:00:00.000Z' },
          { id: '2', title: 'Report 2', date: '2020-10-22T00:00:00.000Z' },
        ],
        'find'
      );

      const response = await request(app).get('/api/reports').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
    });

    test('Should return status 500 if error', async () => {
      mockingoose(Report).toReturn(new Error('Error finding'), 'find');

      await request(app).get('/api/reports').expect(500);
    });
  });

  describe('getReportYears', () => {
    test('Should return status 200 with items', async () => {
      mockingoose(Report).toReturn([2021, 2020], 'distinct');

      const response = await request(app).get('/api/reports/years').expect(200);
      const years = response.body;
      expect(years.length).toBe(2);
      expect(years[0]).toBe(2020);
      expect(years[1]).toBe(2021);
    });

    test('Should return status 500 if error', async () => {
      mockingoose(Report).toReturn(new Error('Error finding'), 'distinct');

      await request(app).get('/api/reports/years').expect(500);
    });
  });

  describe('getYearReports', () => {
    test('Should return status 200 with items', async () => {
      mockingoose(Report).toReturn(
        [
          { id: '1', title: 'Report 1', date: '2020-11-22T00:00:00.000Z' },
          { id: '2', title: 'Report 2', date: '2020-10-22T00:00:00.000Z' },
        ],
        'find'
      );

      const response = await request(app).get('/api/reports/2020').expect(200);
      const reports = response.body;
      expect(reports.length).toBe(2);
    });

    test('Should return status 500 if error', async () => {
      mockingoose(Report).toReturn(new Error('Error finding'), 'find');

      await request(app).get('/api/reports/2020').expect(500);
    });
  });

  describe('getReport', () => {
    test('Should return status 200 with item', async () => {
      mockingoose(Report).toReturn({ title: 'Report 1', date: '2020-11-22T00:00:00.000Z' }, 'findOne');

      const response = await request(app).get('/api/reports/detail/1').expect(200);
      const report = response.body;
      expect(report.title).toBe('Report 1');
    });

    test('Should return status 404 if not found', async () => {
      mockingoose(Report).toReturn(null, 'findOne');

      await request(app).get('/api/reports/detail/1').expect(404);
    });

    test('Should return status 500 if error', async () => {
      mockingoose(Report).toReturn(new Error('Error finding'), 'findOne');

      await request(app).get('/api/reports/detail/1').expect(500);
    });
  });
});
