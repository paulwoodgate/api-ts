import { Schema, model } from 'mongoose';
import { formatReportDates } from '../utils/date-service';

export interface ReportPhoto {
  file: string;
  caption: string;
}
export interface ReportDocument {
  id: string;
  date: Date;
  endDate: Date;
  formattedDate: string;
  year: string;
  title: string;
  subjectType: string;
  report: string[];
  reportBy: string;
  walkRating: string;
  coverPhoto: string;
  photographer: string;
  photos: ReportPhoto[];
}

const reportSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Please enter an event id'],
  },
  date: {
    type: Date,
    required: [true, 'Please enter the event date'],
  },
  endDate: {
    type: Date,
  },
  year: {
    type: Number,
    required: [true, 'Please enter the event year'],
  },
  title: {
    type: String,
    required: [true, 'Please enter the event title'],
  },
  subjectType: {
    type: String,
  },
  report: {
    type: Array,
    required: [true, 'Please enter a report'],
  },
  reportBy: {
    type: String,
    required: [true, 'Please enter who wrote the report'],
  },
  walkRating: {
    type: String,
    required: [true, 'Please enter a walk rating'],
  },
  coverPhoto: String,
  photographer: String,
  photos: [
    {
      file: String,
      caption: String,
    },
  ],
});

reportSchema.set('toJSON', { virtuals: true });
reportSchema.virtual('formattedDate').get(function (this: { date: Date; endDate: Date }) {
  return formatReportDates(this.date, this.endDate);
});

export const Report = model<ReportDocument>('Report', reportSchema);
