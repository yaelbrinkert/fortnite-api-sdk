"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortniteAPI = void 0;
const shop_1 = require("./resources/shop");
const tournaments_1 = require("./resources/tournaments");
const profiles_1 = require("./resources/profiles");
const calendar_1 = require("./resources/calendar");
const errors_1 = require("./errors");
const bundles_1 = require("./resources/bundles");
class FortniteAPI {
    constructor(options) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl || "https://prod.api-fortnite.com/api/v1";
        // this.baseUrl = options.baseUrl || "http://localhost:4321/api/v1";
        // Initialize resources
        this.shop = new shop_1.ShopResource(this);
        this.tournaments = new tournaments_1.TournamentsResource(this);
        this.profiles = new profiles_1.ProfilesResource(this);
        this.calendar = new calendar_1.CalendarResource(this);
        this.bundles = new bundles_1.BundlesResource(this);
    }
    /**
     * Internal method to make HTTP requests
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                "x-api-key": this.apiKey,
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            }
            catch {
                errorData = { error: "Request failed" };
            }
            throw new errors_1.FortniteAPIError(errorData.error || `Request failed with status ${response.status}`, response.status, errorData);
        }
        const data = await response.json();
        return data;
    }
}
exports.FortniteAPI = FortniteAPI;
