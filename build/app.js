"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const secrets_1 = require("./utils/secrets");
const event_routes_1 = __importDefault(require("./routes/event-routes"));
const report_routes_1 = __importDefault(require("./routes/report-routes"));
const message_routes_1 = __importDefault(require("./routes/message-routes"));
const app = (0, express_1.default)();
const mongoUrl = secrets_1.MONGODB_URI ? secrets_1.MONGODB_URI : '';
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    console.log(`Connected to MongoDB! at ${mongoUrl}`);
})
    .catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.set('port', process.env.PORT || 3000);
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, hpp_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'script-src': ['"self"', 'mongodb.com'],
        'img-src': ['"self"', 'https://ik.imagekit.io'],
    },
}));
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, '../assets')));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
const limiter = (0, express_rate_limit_1.default)({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);
app.use('/api/events', event_routes_1.default);
app.use('/api/reports', report_routes_1.default);
app.use('/api/messages', message_routes_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist/index.html'));
});
exports.default = app;
//# sourceMappingURL=app.js.map