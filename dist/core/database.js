"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDatabaseConfig = exports.databaseConfig = exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("./common");
exports.mongoose = mongoose_1.default;
function setDatabaseConfig(config) {
    exports.databaseConfig = config;
}
exports.setDatabaseConfig = setDatabaseConfig;
class DBConnection {
    constructor() {
        (0, common_1.display)("Database: waiting..., Driver:", exports.databaseConfig.driver);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield exports.mongoose.connect(exports.databaseConfig.host, exports.databaseConfig === null || exports.databaseConfig === void 0 ? void 0 : exports.databaseConfig.connectionOption);
                (0, common_1.display)("Database: Connected");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = DBConnection;
