import { FortniteAPI } from "../client";
import { Shop } from "../types";

export class ShopResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current shop items
   */
  async getCurrent(): Promise<Shop> {
    return this.client.request<Shop>("/shop");
  }
}
