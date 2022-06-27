"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = exports.getUpcomingSummary = exports.getUpcomingEvents = exports.getAllEvents = void 0;
const date_fns_1 = require("date-fns");
const event_document_1 = __importDefault(require("../data/event-document"));
const date_service_1 = require("../utils/date-service");
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield event_document_1.default.find({}).sort({ date: 'asc' }).exec();
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllEvents = getAllEvents;
const getUpcomingEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start = (0, date_fns_1.startOfDay)(new Date());
        start.setDate(start.getDate() - 14);
        const data = yield event_document_1.default.find({ date: { $gte: start } })
            .sort({ date: 'asc' })
            .select('id type title image length leave date')
            .exec();
        const events = data.map((ev) => ({
            id: ev.id,
            type: ev.type,
            title: ev.title,
            image: ev.image,
            leave: ev.leave,
            length: ev.formattedLength,
            date: ev.formattedDate,
            month: (0, date_service_1.yearMonth)(ev.date),
        }));
        const months = (0, date_service_1.getMonthList)(events.map((ev) => ev.month));
        const results = {
            events: events,
            months: months,
        };
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUpcomingEvents = getUpcomingEvents;
const getUpcomingSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = (0, date_fns_1.startOfDay)(new Date());
        const data = yield event_document_1.default.find({ date: { $gte: now } })
            .sort({ date: 'asc' })
            .limit(4)
            .select('id title date')
            .exec();
        const results = data.map((ev) => ({ id: ev.id, title: ev.title, date: ev.shortDate }));
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUpcomingSummary = getUpcomingSummary;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const event = yield event_document_1.default.findOne({ id: id }).exec();
        if (!event) {
            res.status(404).json('Event not found');
        }
        else {
            res.status(200).json(event);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getEvent = getEvent;
//# sourceMappingURL=event-controller.js.map