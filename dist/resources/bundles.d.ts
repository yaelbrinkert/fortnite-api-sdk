import { FortniteAPI } from "../client";
import { TournamentsBundle, ShopBundle } from "../types";
export declare class BundlesResource {
    private client;
    constructor(client: FortniteAPI);
    /**
     * Get current season information
     */
    getBundlesTournament(): Promise<TournamentsBundle>;
    /**
     * Get current season information
     */
    getBundlesShop(): Promise<ShopBundle>;
}
