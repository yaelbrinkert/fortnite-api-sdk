import { FortniteAPI } from "../client";
import { Shop } from "../types";
export declare class ShopResource {
    private client;
    constructor(client: FortniteAPI);
    /**
     * Get current shop items
     */
    getCurrent(): Promise<Shop>;
}
