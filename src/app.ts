import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import compression from 'compression';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { MONGODB_URI } from './utils/secrets';

import eventRoutes from './routes/event-routes';
import reportRoutes from './routes/report-routes';
import messageRoutes from './routes/message-routes';

const app = express();

const mongoUrl = MONGODB_URI ? MONGODB_URI : '';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`Connected to MongoDB! at ${mongoUrl}`);
  })
  .catch((err: string) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  });

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(hpp());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'script-src': ['"self"', 'mongodb.com'],
      'img-src': ['"self"', 'https://ik.imagekit.io'],
    },
  })
);
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));

const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

app.use('/api/events', eventRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messageRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

export default app;
