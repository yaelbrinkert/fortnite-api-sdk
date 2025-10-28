import { FortniteAPI } from "../client";
import { Leaderboard } from "../types";
export declare class TournamentsResource {
    private client;
    constructor(client: FortniteAPI);
    /**
     * Get current events
     */
    getCurrent(params?: {
        accountId?: string;
    }): Promise<any>;
    /**
     * Get past events
     */
    getPast(params?: {
        accountId?: string;
    }): Promise<any>;
    /**
     * Get global events
     */
    getGlobal(): Promise<any>;
    /**
     * Get tournament leaderboard
     */
    getLeaderboard(params: {
        eventId: string;
        eventWindowId: string;
        page?: number;
        leaderboardDef?: string;
    }): Promise<Leaderboard>;
}
