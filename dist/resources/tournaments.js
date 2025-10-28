"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentsResource = void 0;
class TournamentsResource {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get current events
     */
    async getCurrent(params) {
        const queryString = params?.accountId
            ? `?accountId=${params.accountId}`
            : "";
        return this.client.request(`/events/data/current${queryString}`);
    }
    /**
     * Get past events
     */
    async getPast(params) {
        const queryString = params?.accountId
            ? `?accountId=${params.accountId}`
            : "";
        return this.client.request(`/events/data/past${queryString}`);
    }
    /**
     * Get global events
     */
    async getGlobal() {
        return this.client.request("/events/global");
    }
    /**
     * Get tournament leaderboard
     */
    async getLeaderboard(params) {
        const { eventId, eventWindowId, page = 0, leaderboardDef } = params;
        const query = new URLSearchParams({
            eventId,
            eventWindowId,
            page: page.toString(),
            ...(leaderboardDef && { leaderboardDef }),
        }).toString();
        return this.client.request(`/events/leaderboard?${query}`);
    }
}
exports.TournamentsResource = TournamentsResource;
