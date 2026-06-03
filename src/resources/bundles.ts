import { FortniteAPI } from "../client";
import { TournamentsBundle, Shop } from "../types";

export class BundlesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get tournament asset bundles (images, icons, rewards)
   */
  async getBundlesTournament(): Promise<TournamentsBundle> {
    return this.client.request<TournamentsBundle>(
      "/assets/bundles/tournaments"
    );
  }

  /**
   * Get shop asset bundles
   */
  async getBundlesShop(): Promise<Shop> {
    return this.client.request<Shop>("/assets/bundles/shop");
  }
}
