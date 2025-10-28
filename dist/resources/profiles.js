"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesResource = void 0;
class ProfilesResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get profile progress by display name
     */
    async getProgress(displayName) {
        return this.client.request(`/profile/progress?displayName=${displayName}`);
    }
    /**
     * Get profile stats by display name
     */
    async getStats(displayName) {
        return this.client.request(`/profile/stats?displayName=${displayName}`);
    }
    /**
     * Get account info by ID
     */
    async getAccount(accountId) {
        return this.client.request(`/account/${accountId}`);
    }
    /**
     * Get multiple display names
     */
    async getDisplayNames(accountIds) {
        const ids = accountIds.join(",");
        return this.client.request(`/displaynames/multiple?ids=${ids}`);
    }
}
exports.ProfilesResource = ProfilesResource;
