"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
        this.login = this.login.bind(this);
    }
    async login(req, res, _next) {
        try {
            const { email, password } = req.body;
            const user = await this.loginService.login(email, password);
            if (user == null) {
                return res.status(404).json({ message: "user not found" });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map