import { ReportDocument } from './../../src/data/report-document';
import { createViewModel } from './../../src/models/report-view-model';

describe('Report View Model Tests', () => {
  describe('Create View Model Tests', () => {
    test('it should populate essential values', () => {
      const reportDoc: ReportDocument = {
        id: '123',
        subjectType: 'test',
        date: new Date(2022, 5, 2),
        formattedDate:'',
        year: '2022',
        report: [],
        reportBy: '',
        endDate: new Date(2022, 5, 2),
        title: 'Test Report',
        walkRating: '',
        coverPhoto: '',
        photographer: '',
        photos: []
      };

      const model = createViewModel(reportDoc);

      expect(model.id).toBe(reportDoc.id);
      expect(model.eventDate).toBe(reportDoc.date);
      expect(model.eventType).toBe(reportDoc.subjectType);
      expect(model.title).toBe(reportDoc.title);
    });
  });
});