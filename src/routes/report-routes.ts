import express from 'express';
import { getAllReports, getReport, getReportYears, getYearReports } from '../controllers/report-controller';

const router = express.Router();

router.get('/', getAllReports);
router.get('/years', getReportYears);
router.get('/:year', getYearReports);
router.get('/detail/:id', getReport);

export default router;
