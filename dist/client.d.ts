import { ShopResource } from "./resources/shop";
import { TournamentsResource } from "./resources/tournaments";
import { ProfilesResource } from "./resources/profiles";
import { CalendarResource } from "./resources/calendar";
import { BundlesResource } from "./resources/bundles";
export interface ClientOptions {
    apiKey: string;
    baseUrl?: string;
}
export declare class FortniteAPI {
    private apiKey;
    private baseUrl;
    shop: ShopResource;
    tournaments: TournamentsResource;
    profiles: ProfilesResource;
    calendar: CalendarResource;
    bundles: BundlesResource;
    constructor(options: ClientOptions);
    /**
     * Internal method to make HTTP requests
     */
    request<T>(endpoint: string, options?: RequestInit): Promise<T>;
}
