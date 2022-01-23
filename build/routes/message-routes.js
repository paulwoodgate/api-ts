"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message-controller");
const router = express_1.default.Router();
router.post('/', message_controller_1.createMessage);
exports.default = router;
//# sourceMappingURL=message-routes.js.map