"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenGenerator_1 = require("../helper/TokenGenerator");
const BCrypt_1 = __importDefault(require("../helper/BCrypt"));
class LoginService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(email, password) {
        var _a, _b, _c;
        const user = await this.userModel.findOne({ "user.email": email });
        if (!user) {
            return null;
        }
        try {
            const validation = await BCrypt_1.default.compare(password, (_a = user.user) === null || _a === void 0 ? void 0 : _a.password);
            if (validation) {
                const result = {
                    token: TokenGenerator_1.TokenGenerator.generateToken((_b = user.user) === null || _b === void 0 ? void 0 : _b.email).token,
                    id: (_c = user._id) === null || _c === void 0 ? void 0 : _c.toString(),
                };
                return result;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Erro ao comparar senhas:', error);
            throw new Error('Erro ao comparar senhas.');
        }
    }
}
exports.default = LoginService;
//# sourceMappingURL=LoginService.js.map