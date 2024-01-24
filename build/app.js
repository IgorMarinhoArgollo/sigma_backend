"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const ErrorHandler_1 = __importDefault(require("./middleware/ErrorHandler"));
const AccessControllMiddleware_1 = __importDefault(require("./middleware/AccessControllMiddleware"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const UserService_1 = __importDefault(require("./service/UserService"));
const UserModel_1 = __importDefault(require("./model/UserModel"));
const LoginRouter_1 = __importDefault(require("./router/LoginRouter"));
const LoginController_1 = __importDefault(require("./controller/LoginController"));
const LoginService_1 = __importDefault(require("./service/LoginService"));
const RateLimiter_1 = __importDefault(require("./helper/RateLimiter"));
const helmet_1 = __importDefault(require("helmet"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, helmet_1.default)());
        this.app.use(RateLimiter_1.default);
        this.dbConnection = connection_1.default.getInstance();
        this.connectToDatabase();
        this.config();
        this.loginService = new LoginService_1.default(UserModel_1.default);
        this.loginController = new LoginController_1.default(this.loginService);
        this.loginRouter = new LoginRouter_1.default(this.loginController);
        this.userService = new UserService_1.default(UserModel_1.default);
        this.userController = new UserController_1.default(this.userService);
        this.userRouter = new UserRouter_1.default(this.userController);
        this.setupRoutes();
        this.errorMiddleware();
    }
    async connectToDatabase() {
        await this.dbConnection.connect();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(AccessControllMiddleware_1.default.handleAccessControl);
    }
    setupRoutes() {
        this.app.use('/user', this.userRouter.getRouter());
        this.app.use('/', this.loginRouter.getRouter());
    }
    errorMiddleware() {
        this.app.use(ErrorHandler_1.default.handle);
    }
    getApp() {
        return this.app;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map