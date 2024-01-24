"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBConnection {
    constructor() {
        this.uri = process.env.MONGO_URI || ' ';
    }
    static getInstance() {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.uri);
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
}
MongoDBConnection.instance = null;
exports.default = MongoDBConnection;
//# sourceMappingURL=connection.js.map