"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = require("mongoose");
const date_service_1 = require("../utils/date-service");
const reportSchema = new mongoose_1.Schema({
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
reportSchema.virtual('formattedDate').get(function () {
    return (0, date_service_1.formatReportDates)(this.date, this.endDate);
});
exports.Report = (0, mongoose_1.model)('Report', reportSchema);
//# sourceMappingURL=report-model.js.map