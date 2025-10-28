"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortniteAPIError = void 0;
class FortniteAPIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "FortniteAPIError";
        this.status = status;
        this.data = data;
    }
}
exports.FortniteAPIError = FortniteAPIError;
