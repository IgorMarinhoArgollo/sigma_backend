"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
class UserRouter {
    constructor(userController) {
        this.router = express_1.default.Router();
        this.userController = userController;
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', AuthMiddleware_1.default.handle, this.userController.getUser);
        this.router.post('/', this.userController.createUser);
        this.router.put('/', AuthMiddleware_1.default.handle, this.userController.updateUser); //
        this.router.delete('/:id', this.userController.deleteUserById);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map