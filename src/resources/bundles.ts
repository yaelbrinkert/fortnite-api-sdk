import { FortniteAPI } from "../client";
import { TournamentsBundle, Shop } from "../types";

export class BundlesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current season information
   */
  async getBundlesTournament(): Promise<TournamentsBundle> {
    return this.client.request<TournamentsBundle>(
      "/assets/bundles/tournaments"
    );
  }

  /**
   * Get current season information
   */
  async getBundlesShop(): Promise<Shop> {
    return this.client.request<Shop>("/assets/bundles/shop");
  }
}
