import { Report, ReportDocument } from '../data/report-document';
import { Request, Response } from 'express';
import { ReportSummaryModel } from '../models/report-summary-model';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const results = await Report.find({}).sort({ date: 'asc' }).exec();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReportYears = async (req: Request, res: Response) => {
  try {
    const results = await Report.distinct('year').exec();
    res.status(200).json(results.sort());
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getYearReports = async (req: Request, res: Response) => {
  try {
    const year = Number(req.params.year);
    const start = new Date(year, 0, 1);
    const finish = new Date(year, 11, 31);
    const results = await Report.find({ date: { $gte: start, $lte: finish }, subjectType: { $ne: 'Day' } })
      .sort({ date: 'asc' })
      .select('id title date endDate formattedDate year coverPhoto')
      .exec();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const getDayReports = async (id: string) => {
      const dayReports: ReportDocument[] = await Report.find({ id: { $regex: id + '-' } })
        .sort({ date: 'asc' })
        .select('id title date year formattedDate coverPhoto')
        .exec();

      return dayReports.map((r: ReportDocument) => ({
        id: r.id,
        date:r.date,
        formattedDate: r.formattedDate,
        title: r.title,
        year: r.year,
        coverPhoto: r.coverPhoto,
      }));
    };
    const data = await Report.findOne({ id: id }).exec();
    if (data) {
      let reports: ReportSummaryModel[] = [];
      if (data.subjectType === 'Group') {
        reports = await getDayReports(id);
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
    } else {
      res.status(404).json('Report not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
