"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@configs/app"); // load all configuarations
require("./models/users.model");
const mix_1 = __importDefault(require("@mix/mix"));
const mix = new mix_1.default();
mix.run();
