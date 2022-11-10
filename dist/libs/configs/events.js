"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("@mix/socket");
(0, socket_1.loadEvent)({
    require: [
        require("@events/socket")
    ]
});
exports.default = socket_1.socketConfig;
