"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const report_controller_1 = require("../controllers/report-controller");
const router = express_1.default.Router();
router.get('/', report_controller_1.getAllReports);
router.get('/years', report_controller_1.getReportYears);
router.get('/:year', report_controller_1.getYearReports);
router.get('/detail/:id', report_controller_1.getReport);
exports.default = router;
//# sourceMappingURL=report-routes.js.map