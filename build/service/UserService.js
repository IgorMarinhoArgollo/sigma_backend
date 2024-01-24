"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BCrypt_1 = __importDefault(require("../helper/BCrypt"));
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(email) {
        var _a, _b, _c;
        const user = await this.userModel.findOne({ "user.email": email }).lean();
        if (!user) {
            return null;
        }
        const allowView = [];
        user.permissions.forEach((permission) => {
            const parts = permission.split(':');
            if (parts[parts.length - 1] === 'view') {
                allowView.push(parts[parts.length - 2]);
            }
        });
        const mappedUser = {
            user: {
                firstname: allowView.includes('firstname') ? (_a = user.user) === null || _a === void 0 ? void 0 : _a.firstname : undefined,
                lastname: allowView.includes('lastname') ? (_b = user.user) === null || _b === void 0 ? void 0 : _b.lastname : undefined,
                email: allowView.includes('email') ? (_c = user.user) === null || _c === void 0 ? void 0 : _c.email : undefined,
            },
            permissions: user.permissions,
        };
        return mappedUser;
    }
    // no filter
    async getUserByEmail(email) {
        return await this.userModel.findOne({ "user.email": email }).lean();
    }
    async updateUser(original, newData) {
        var _a, _b, _c, _d, _e, _f, _g;
        const allowEdit = [];
        original.permissions.forEach((permission) => {
            const parts = permission.split(':');
            if (parts[parts.length - 1] === 'edit') {
                allowEdit.push(parts[parts.length - 2]);
            }
        });
        try {
            console.log('Allow Edit:', allowEdit);
            console.log('Original User:', original);
            console.log('New Data:', newData);
            if (allowEdit.includes("firstname") && ((_a = newData.user) === null || _a === void 0 ? void 0 : _a.firstname) && newData.user.firstname.trim() !== '') {
                const updatedUser = await this.userModel.findOneAndUpdate({ "user.email": original.user.email }, { $set: { "user.firstname": newData.user.firstname } }, { new: true });
                if (updatedUser) {
                    console.log('User updated successfully:', updatedUser);
                }
                else {
                    console.log('User not found or update failed.');
                }
            }
            if (allowEdit.includes("lastname") && ((_b = newData.user) === null || _b === void 0 ? void 0 : _b.lastname) && newData.user.lastname.trim() !== '') {
                await this.userModel.findOneAndUpdate({ "user.email": original.user.email }, { "user.lastname": (_c = newData.user) === null || _c === void 0 ? void 0 : _c.lastname });
            }
            if (!await this.userModel.findOne({ "user.email": (_d = newData.user) === null || _d === void 0 ? void 0 : _d.email })) {
                if (allowEdit.includes("email") && ((_e = newData.user) === null || _e === void 0 ? void 0 : _e.email) && newData.user.email.trim() !== '') {
                    await this.userModel.findOneAndUpdate({ "user.email": original.user.email }, { "user.email": (_f = newData.user) === null || _f === void 0 ? void 0 : _f.email });
                }
            }
            if ((_g = newData.user) === null || _g === void 0 ? void 0 : _g.email) {
                return await this.userModel.findOne({ "user.email": newData.user.email });
            }
            return await this.userModel.findOne({ "user.email": original.user.email });
        }
        catch (error) {
            console.error("Error: it was not possible to update user");
            return null;
        }
    }
    async deleteUserById(id) {
        return this.userModel.findByIdAndDelete(id);
    }
    async createUser(firstname, lastname, email, password, permissions) {
        try {
            const userData = {
                user: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: await BCrypt_1.default.encrypt(password),
                },
                permissions: permissions,
            };
            const createdUser = await this.userModel.create(userData);
            return createdUser.toObject();
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário.');
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map