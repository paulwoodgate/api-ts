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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReport = exports.getYearReports = exports.getReportYears = exports.getAllReports = void 0;
const report_model_1 = require("../models/report-model");
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_model_1.Report.find({}).sort({ date: 'asc' }).exec();
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllReports = getAllReports;
const getReportYears = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield report_model_1.Report.distinct('year').exec();
        res.status(200).json(results.sort());
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getReportYears = getReportYears;
const getYearReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = Number(req.params.year);
        const start = new Date(year, 0, 1);
        const finish = new Date(year, 11, 31);
        const results = yield report_model_1.Report.find({ date: { $gte: start, $lte: finish }, subjectType: { $ne: 'Day' } })
            .sort({ date: 'asc' })
            .select('id title date endDate formattedDate year coverPhoto')
            .exec();
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getYearReports = getYearReports;
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getDayReports = (id) => __awaiter(void 0, void 0, void 0, function* () {
            const dayReports = yield report_model_1.Report.find({ id: { $regex: id + '-' } })
                .sort({ date: 'asc' })
                .select('id title date year formattedDate coverPhoto')
                .exec();
            return dayReports.map((r) => ({
                id: r.id,
                date: r.formattedDate,
                title: r.title,
                year: r.year,
                coverPhoto: r.coverPhoto,
            }));
        });
        const data = yield report_model_1.Report.findOne({ id: id }).exec();
        if (data) {
            let reports = [];
            if (data.subjectType === 'Group') {
                reports = yield getDayReports(id);
            }
            const report = {
                id: data.id,
                date: data.date,
                endDate: data.endDate,
                formattedDate: data.formattedDate,
                year: data.year,
                title: data.title,
                report: data.report,
                coverPhoto: data.coverPhoto,
                subjectType: data.subjectType,
                walkRating: data.walkRating,
                reportBy: data.reportBy,
                photographer: data.photographer,
                photos: data.photos,
                days: reports,
            };
            res.status(200).json(report);
        }
        else {
            res.status(404).json('Report not found');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getReport = getReport;
//# sourceMappingURL=report-controller.js.map