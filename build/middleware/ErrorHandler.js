"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static handle(err, req, res, _next) {
        console.error(err);
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).json({ message });
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map