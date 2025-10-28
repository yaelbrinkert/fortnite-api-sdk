import { FortniteAPI } from "../client";
import { Profile, ProfileStats } from "../types";
export declare class ProfilesResource {
    private client;
    constructor(client: FortniteAPI);
    /**
     * Get profile progress by display name
     */
    getProgress(displayName: string): Promise<any>;
    /**
     * Get profile stats by display name
     */
    getStats(displayName: string): Promise<ProfileStats>;
    /**
     * Get account info by ID
     */
    getAccount(accountId: string): Promise<Profile>;
    /**
     * Get multiple display names
     */
    getDisplayNames(accountIds: string[]): Promise<Record<string, string>>;
}
