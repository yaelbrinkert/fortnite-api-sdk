import { FortniteAPI } from "../client";
import { TournamentsBundle, ShopBundle } from "../types";

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
  async getBundlesShop(): Promise<ShopBundle> {
    return this.client.request<ShopBundle>("/assets/bundles/shop");
  }
}
