"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthList = exports.monthDesc = exports.yearMonth = exports.formatReportDates = exports.formatWeekendDates = exports.formatEventDate = void 0;
const date_fns_1 = require("date-fns");
const longFormat = 'eeee do MMMM';
const shortFormat = 'eeee do';
const formatEventDate = (date) => {
    return (0, date_fns_1.format)(date, longFormat);
};
exports.formatEventDate = formatEventDate;
const formatWeekendDates = (startDate, duration) => {
    const endDate = (0, date_fns_1.addDays)(startDate, duration);
    if ((0, date_fns_1.isSameMonth)(startDate, endDate)) {
        return `${(0, date_fns_1.format)(startDate, shortFormat)} to ${(0, date_fns_1.format)(endDate, longFormat)}`;
    }
    return `${(0, date_fns_1.format)(startDate, longFormat)} to ${(0, date_fns_1.format)(endDate, longFormat)}`;
};
exports.formatWeekendDates = formatWeekendDates;
const formatReportDates = (startDate, endDate) => {
    if (endDate == null) {
        return (0, date_fns_1.format)(startDate, longFormat);
    }
    if ((0, date_fns_1.isSameMonth)(startDate, endDate)) {
        return `${(0, date_fns_1.format)(startDate, shortFormat)} to ${(0, date_fns_1.format)(endDate, longFormat)}`;
    }
    return `${(0, date_fns_1.format)(startDate, longFormat)} to ${(0, date_fns_1.format)(endDate, longFormat)}`;
};
exports.formatReportDates = formatReportDates;
const yearMonth = (date) => {
    return (0, date_fns_1.format)(date, 'yyyy/MM');
};
exports.yearMonth = yearMonth;
function monthName(yearMonth) {
    const year = Number(yearMonth.substring(0, 4));
    const month = Number(yearMonth.substring(5, 7));
    const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
    return (0, date_fns_1.format)(date, 'MMMM yyyy');
}
const monthDesc = (yearMonth) => {
    return monthName(yearMonth);
};
exports.monthDesc = monthDesc;
const getMonthList = (yearMonths) => {
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
exports.getMonthList = getMonthList;
//# sourceMappingURL=date-service.js.map