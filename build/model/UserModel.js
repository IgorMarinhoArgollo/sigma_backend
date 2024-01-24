"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    user: {
        firstname: {
            type: String,
            required: true,
            nullable: false
        },
        lastname: {
            type: String,
            required: true,
            nullable: false
        },
        email: {
            type: String,
            required: true,
            nullable: false
        },
        password: {
            type: String,
            required: true,
            nullable: false
        }
    },
    permissions: {
        type: [String],
        default: []
    }
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map