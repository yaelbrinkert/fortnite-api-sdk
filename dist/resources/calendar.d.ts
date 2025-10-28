import { FortniteAPI } from "../client";
import { SeasonInfo } from "../types";
export declare class CalendarResource {
    private client;
    constructor(client: FortniteAPI);
    /**
     * Get current season information
     */
    getCurrentSeason(): Promise<SeasonInfo>;
}
