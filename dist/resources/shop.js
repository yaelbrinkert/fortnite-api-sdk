"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopResource = void 0;
class ShopResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current shop items
     */
    async getCurrent() {
        return this.client.request("/shop");
    }
}
exports.ShopResource = ShopResource;
