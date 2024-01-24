"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
    }
    async getUser(req, res, _next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(404).json({ message: 'User nor found' });
            }
            const token = authorization.split(' ');
            const email = jwt.verify(token[1], process.env.JWT_SECRET || 'secret').email;
            const user = await this.userService.getUser(email);
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async createUser(req, res, _next) {
        try {
            const { user, permissions } = req.body;
            const { firstname, lastname, email, password } = user;
            const newUser = await this.userService.createUser(firstname, lastname, email, password, permissions);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async updateUser(req, res, _next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(404).json({ message: 'User nor found' });
            }
            const token = authorization.split(' ');
            const email = jwt.verify(token[1], process.env.JWT_SECRET || 'secret').email;
            const original = await this.userService.getUserByEmail(email);
            if (!original) {
                return res.status(404).json({ error: 'User not found' });
            }
            const updatedUser = await this.userService.updateUser(original, req.body);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async deleteUserById(req, res, _next) {
        try {
            const deletedUser = await this.userService.deleteUserById(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map