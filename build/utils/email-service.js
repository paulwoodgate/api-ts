"use strict";
/* eslint-disable no-console */
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
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = {
    sendEmail: (msg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recipients = process.env.EMAIL_RECIPIENTS
                ? `${process.env.EMAIL_USER}, ` + process.env.EMAIL_RECIPIENTS
                : process.env.EMAIL_USER;
            const options = {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            };
            const transporter = nodemailer_1.default.createTransport({
                options,
                tls: {
                    rejectUnauthorized: false,
                },
            });
            yield transporter.sendMail({
                from: `${msg.name} <${msg.email}>`,
                to: recipients,
                subject: `Message from ${msg.name}`,
                html: msg.message,
            });
            return true;
        }
        catch (error) {
            console.log('Error', error);
            return false;
        }
    }),
};
//# sourceMappingURL=email-service.js.map