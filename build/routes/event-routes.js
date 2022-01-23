"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event-controller");
const router = express_1.default.Router();
router.get('/', event_controller_1.getAllEvents);
router.get('/upcoming', event_controller_1.getUpcomingEvents);
router.get('/summary', event_controller_1.getUpcomingSummary);
router.get('/:id', event_controller_1.getEvent);
exports.default = router;
//# sourceMappingURL=event-routes.js.map