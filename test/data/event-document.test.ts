import Event from './../../src/data/event-document';

describe('Event Document Tests', () => {
  describe('Date Tests', () => {
    test('it should return the date of an event as Tuesday 22nd September', () => {
      const event = new Event({
        type: 'Walk',
        date: new Date('22 Sep 2020'),
      });

      expect(event.formattedDate).toBe('Tuesday 22nd September');
      expect(event.shortDate).toBe('Tuesday 22nd September');
    });

    test('it should return the date of a weekend as Friday 1st to Sunday 3rd October', () => {
      const event = new Event({
        type: 'Weekend',
        date: new Date('01 Oct 2021'),
        length: 2,
      });

      expect(event.formattedDate).toBe('Friday 1st to Sunday 3rd October');
    });
  });
  describe('YearMonth Tests', () => {
    test('it should return May 2022 as 2022/05', () => {
      const event = new Event({
        type: 'Walk',
        date: new Date('2 May 2022'),
      });
      expect(event.yearMonth).toBe('2022/05');
    });
  });
  describe('formattedDistance Tests', () => {
    test('it should return empty string if no value', () => {
      const event = new Event({
        type: 'Weekend',
      });
      expect(event.formattedDistance).toBe('');
    });

    it('should return the value suffixed with miles', () => {
      const event = new Event({
        type: 'Walk',
        distanceAway: 103,
      });
      expect(event.formattedDistance).toBe('103 miles');
    });
  });

  describe('formattedLength Tests', () => {
    it('should return empty string if no value', () => {
      const event = new Event({
        type: 'Walk',
      });
      expect(event.formattedLength).toBe('');
    });

    it('should return empty string if value is 0', () => {
      const event = new Event({
        type: 'Walk',
        length: 0
      });
      expect(event.formattedLength).toBe('');
    });
    it('should return the value suffixed with miles', () => {
      const event = new Event({
        type: 'Walk',
        length: 10.4,
      });
      expect(event.formattedLength).toBe('10.4 miles');
    });
  });

  describe('formattedTime Tests', () => {
    it('should return empty string if no value', () => {
      const event = new Event({
        type: 'Walk',
      });
      expect(event.formattedTime).toBe('');
    });

    it('should return the hours only if no minutes', () => {
      const event = new Event({
        type: 'Walk',
        walkTime: 5,
      });
      expect(event.formattedTime).toBe('5 hours');
    });

    it('should return the hours and minutes if not whole hours', () => {
      const event = new Event({
        type: 'Walk',
        walkTime: 5.25,
      });
      expect(event.formattedTime).toBe('5 hours 15 minutes');
    });
  });

  describe('formattedCost Tests', () => {
    it('should return empty string if no value', () => {
      const event = new Event({
        type: 'Walk',
      });
      expect(event.formattedCost).toBe('');
    });

    it('should return the value prefixed with £ to 2 dp', () => {
      const event = new Event({
        type: 'Walk',
        fuelCost: 10.4,
      });
      expect(event.formattedCost).toBe('£10.40');
    });
  });
});
