import { FortniteAPI } from "../client";
import { Shop } from "../types";

export class ShopResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current shop items with optional filtering
   * @param options - Query options
   * @param options.type - Filter by cosmetic type: outfit, emote, pickaxe, glider, backpack, wrap, music, loadingscreen, contrail, spray, toy, emoji, pet, bundle
   * @param options.section - Filter by shop section name (e.g. "Featured", "Daily", "Kicks")
   * @param options.rarity - Filter by rarity: common, uncommon, rare, epic, legendary, mythic
   * @param options.search - Search items by name (e.g. "galaxy", "travis")
   */
  async getCurrent(options?: {
    type?: string;
    section?: string;
    rarity?: string;
    search?: string;
  }): Promise<Shop> {
    const params = new URLSearchParams();
    if (options?.type) params.set("type", options.type);
    if (options?.section) params.set("section", options.section);
    if (options?.rarity) params.set("rarity", options.rarity);
    if (options?.search) params.set("search", options.search);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<Shop>(`/shop${query}`);
  }
}
