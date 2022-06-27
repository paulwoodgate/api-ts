"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const message_document_1 = __importDefault(require("../data/message-document"));
const email_service_1 = __importDefault(require("../utils/email-service"));
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const message = new message_document_1.default({
        name: data.name,
        email: data.email,
        message: data.message,
    });
    try {
        const savedMsg = yield message.save();
        const success = yield email_service_1.default.sendEmail(message);
        if (!success) {
            res.status(500).json('An error occurred sending the email');
            return;
        }
        res.status(200).json(savedMsg);
    }
    catch (error) {
        // console.log('Error', error);
        res.status(500).json(error);
    }
});
exports.createMessage = createMessage;
//# sourceMappingURL=message-controller.js.map