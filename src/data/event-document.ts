import { Schema, model } from 'mongoose';
import { formatEventDate, formatWeekendDates, yearMonth } from '../utils/date-service';

export interface EventDocument {
  type: string;
  id: string;
  date: Date;
  title: string;
  image: string;
  description: [string];
  startsFrom: string;
  distanceAway: number;
  county: string;
  length: number;
  leave: string;
  w3wReference: string;
  mapReference: string;
  nearTo: string;
  walkTime: string;
  ascent: string;
  source: {
    name: string;
    url: string;
  };
  terrain: string;
  grading: string;
  fuelCost: number;
  formattedDate: string;
  shortDate: string;
  formattedLength: string;
  formattedDistance: string;
  formattedTime: string;
  formattedCost: string;
  yearMonth: string;
}

const eventSchema = new Schema<EventDocument>(
  {
    type: {
      type: String,
      required: [true, 'Please enter an event type'],
    },
    id: {
      type: String,
      required: [true, 'Please enter an event id'],
    },
    date: {
      type: Date,
      required: [true, 'Please enter the event date'],
    },
    title: {
      type: String,
      required: [true, 'Please enter an event title'],
    },
    image: String,
    description: [String],
    startsFrom: String,
    distanceAway: Number,
    county: String,
    length: Number,
    leave: String,
    w3wReference: String,
    mapReference: String,
    nearTo: String,
    walkTime: String,
    ascent: String,
    source: {
      name: String,
      url: String,
    },
    terrain: String,
    grading: String,
    fuelCost: Number,
  },
  { timestamps: true }
);

eventSchema.set('toJSON', { virtuals: true });

eventSchema.virtual('formattedDate').get(function (this: { type: string; date: Date; length: number }) {
  if (this.type === 'Weekend') {
    return formatWeekendDates(this.date, this.length);
  }
  return formatEventDate(this.date);
});
eventSchema.virtual('shortDate').get(function (this: { date: Date }) {
  return formatEventDate(this.date);
});
eventSchema.virtual('formattedLength').get(function (this: { length: number }) {
  return formatMiles(this.length);
});
eventSchema.virtual('formattedDistance').get(function (this: { distanceAway: number }) {
  return formatMiles(this.distanceAway);
});
eventSchema.virtual('yearMonth').get(function (this: { date: Date }) {
  return yearMonth(this.date);
});

function formatMiles(distance: number) {
  if (distance === undefined || distance === 0) {
    return '';
  }
  return `${distance} miles`;
}

eventSchema.virtual('formattedTime').get(function (this: { walkTime: number }) {
  if (this.walkTime === undefined) {
    return '';
  }

  const hours = Math.trunc(this.walkTime);
  const minutes = 60 * (this.walkTime - hours);
  let value = `${hours} hours`;

  if (minutes > 0) {
    value += ` ${minutes} minutes`;
  }

  return value;
});

eventSchema.virtual('formattedCost').get(function (this: { fuelCost: number }) {
  if (this.fuelCost === undefined) {
    return '';
  }
  return `£${this.fuelCost.toFixed(2)}`;
});

const Event = model<EventDocument>('Event', eventSchema);

export default Event;
