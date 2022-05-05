import { ReportDocument, ReportPhoto } from '../data/report-document';

export interface ReportViewModel{
    id: string,
    eventType: string,
    eventDate: Date,
    endDate?: Date,
    title: string,
    report?: string,
    author?: string,
    rating?: string,
    photographer?: string,
    coverPhoto?: string,
    photos?: ReportPhoto[]
}
export const createViewModel = (report: ReportDocument) => {
    const model = {
        id: report.id,
        eventType: report.subjectType,
        eventDate: report.date,
        title: report.title
    };

    return model;
};