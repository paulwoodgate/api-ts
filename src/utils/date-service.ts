import { format, isSameMonth, addDays } from 'date-fns';

const longFormat = 'eeee do MMMM';
const shortFormat = 'eeee do';

export const formatEventDate = (date: Date) => {
  return format(date, longFormat);
};

export const formatWeekendDates = (startDate: Date, duration: number) => {
  const endDate = addDays(startDate, duration);
  if (isSameMonth(startDate, endDate)) {
    return `${format(startDate, shortFormat)} to ${format(endDate, longFormat)}`;
  }
  return `${format(startDate, longFormat)} to ${format(endDate, longFormat)}`;
};

export const formatReportDates = (startDate: Date, endDate: Date | null) => {
  if (endDate == null) {
    return format(startDate, longFormat);
  }
  if (isSameMonth(startDate, endDate)) {
    return `${format(startDate, shortFormat)} to ${format(endDate, longFormat)}`;
  }
  return `${format(startDate, longFormat)} to ${format(endDate, longFormat)}`;
};

export const yearMonth = (date: Date) => {
  return format(date, 'yyyy/MM');
};

function monthName(yearMonth: string) {
  const year = Number(yearMonth.substring(0, 4));
  const month = Number(yearMonth.substring(5, 7));
  const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
  return format(date, 'MMMM yyyy');
}

export const monthDesc = (yearMonth: string) => {
  return monthName(yearMonth);
};

export const getMonthList = (yearMonths: string[]) => {
  const uniqueMonths = Array.from(new Set(yearMonths));
  const months = uniqueMonths.map((m) => ({
    text: monthName(m),
    value: m,
  }));

  const allMonths = {
    text: '(All months)',
    value: '',
  };
  months.splice(0, 0, allMonths);
  return months;
};
