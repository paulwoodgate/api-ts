import { Report } from '../../src/data/report-document';

describe('Report Document Tests', () => {
  describe('Validation Tests', () => {
    it('should fail validation if no event id', () => {
      const report = new Report({
        date: new Date('15 Aug 2021'),
        year: 2021,
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
        walkRating: 'Very Good',
      });

      const err = report.validateSync();

      expect(err?.errors['id'].message).toBe('Please enter an event id');
    });

    it('should fail validation if no event date', () => {
      const report = new Report({
        id: 'walk-2021-01',
        year: 2021,
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
        walkRating: 'Very Good',
      });

      const err = report.validateSync();

      expect(err?.errors['date'].message).toBe('Please enter the event date');
    });

    it('should fail validation if no year', () => {
      const report = new Report({
        id: 'walk-2021-01',
        date: new Date('15 Aug 2021'),
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
        walkRating: 'Very Good',
      });

      const err = report.validateSync();

      expect(err?.errors['year'].message).toBe('Please enter the event year');
    });

    it('should fail validation if no event title', () => {
      const report = new Report({
        id: 'walk-2021-01',
        date: new Date('15 Aug 2021'),
        year: 2021,
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
        walkRating: 'Very Good',
      });

      const err = report.validateSync();

      expect(err?.errors['title'].message).toBe('Please enter the event title');
    });

    it('should fail validation if no event report author', () => {
      const report = new Report({
        id: 'walk-2021-01',
        date: new Date('15 Aug 2021'),
        year: 2021,
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        walkRating: 'Very Good',
      });

      const err = report.validateSync();
      expect(err?.errors['reportBy'].message).toBe('Please enter who wrote the report');
    });

    it('should fail validation if no walk rating', () => {
      const report = new Report({
        id: 'walk-2021-01',
        date: new Date('15 Aug 2021'),
        year: 2021,
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
      });

      const err = report.validateSync();

      expect(err?.errors['walkRating'].message).toBe('Please enter a walk rating');
    });

    it('should pass validation if all values supplied', () => {
      const report = new Report({
        id: 'walk-2021-01',
        date: new Date('15 Aug 2021'),
        year: 2021,
        title: 'Test Title',
        report: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec.'],
        reportBy: 'Fred',
        walkRating: 'Very Good',
      });

      const err = report.validateSync();

      expect(err).toBeUndefined();
    });
  });

  describe('formattedDate Test', () => {
    it('should return the date of a walk as Sunday 15th August', () => {
      const report = new Report({
        date: new Date('15 Aug 2021'),
      });
      expect(report.formattedDate).toBe('Sunday 15th August');
    });
  });
});
