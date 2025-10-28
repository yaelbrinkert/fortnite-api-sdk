"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarResource = void 0;
class CalendarResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current season information
     */
    async getCurrentSeason() {
        return this.client.request("/season");
    }
}
exports.CalendarResource = CalendarResource;
