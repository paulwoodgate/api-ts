"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const date_service_1 = require("../utils/date-service");
const eventSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
eventSchema.set('toJSON', { virtuals: true });
eventSchema.virtual('formattedDate').get(function () {
    if (this.type === 'Weekend') {
        return (0, date_service_1.formatWeekendDates)(this.date, this.length);
    }
    return (0, date_service_1.formatEventDate)(this.date);
});
eventSchema.virtual('shortDate').get(function () {
    return (0, date_service_1.formatEventDate)(this.date);
});
eventSchema.virtual('formattedLength').get(function () {
    return formatMiles(this.length);
});
eventSchema.virtual('formattedDistance').get(function () {
    return formatMiles(this.distanceAway);
});
eventSchema.virtual('yearMonth').get(function () {
    return (0, date_service_1.yearMonth)(this.date);
});
function formatMiles(distance) {
    if (distance === undefined) {
        return '';
    }
    return `${distance} miles`;
}
eventSchema.virtual('formattedTime').get(function () {
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
eventSchema.virtual('formattedCost').get(function () {
    if (this.fuelCost === undefined) {
        return '';
    }
    return `£${this.fuelCost.toFixed(2)}`;
});
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
//# sourceMappingURL=event-model.js.map