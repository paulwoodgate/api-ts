import express from 'express';
import { getAllEvents, getEvent, getUpcomingEvents, getUpcomingSummary } from '../controllers/event-controller';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/summary', getUpcomingSummary);
router.get('/:id', getEvent);

export default router;
