"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlesResource = void 0;
class BundlesResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current season information
     */
    async getBundlesTournament() {
        return this.client.request("/assets/bundles/tournaments");
    }
    /**
     * Get current season information
     */
    async getBundlesShop() {
        return this.client.request("/assets/bundles/shop");
    }
}
exports.BundlesResource = BundlesResource;
