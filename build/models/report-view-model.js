"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewModel = void 0;
const createViewModel = (report) => {
    const model = {
        id: report.id,
        eventType: report.subjectType,
        eventDate: report.date,
        title: report.title
    };
    return model;
};
exports.createViewModel = createViewModel;
//# sourceMappingURL=report-view-model.js.map