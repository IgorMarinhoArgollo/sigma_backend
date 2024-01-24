"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class LoginRouter {
    constructor(loginController) {
        this.router = express_1.default.Router();
        this.loginController = loginController;
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post('/', this.loginController.login);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = LoginRouter;
//# sourceMappingURL=LoginRouter.js.map