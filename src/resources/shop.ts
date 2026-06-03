import { FortniteAPI } from "../client";
import { Shop } from "../types";

export class ShopResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current shop items with optional filtering
   * @param options.type - Filter by cosmetic type (e.g. outfit, emote, pickaxe, glider)
   * @param options.section - Filter by shop section name (e.g. "Featured", "Daily", "Kicks")
   * @param options.rarity - Filter by rarity (e.g. rare, epic, legendary)
   * @param options.search - Search items by name
   * @param options.lang - Language code (default: en)
   */
  async getCurrent(options?: {
    type?: string;
    section?: string;
    rarity?: string;
    search?: string;
    lang?: string;
  }): Promise<Shop> {
    const params = new URLSearchParams();
    if (options?.type) params.set("type", options.type);
    if (options?.section) params.set("section", options.section);
    if (options?.rarity) params.set("rarity", options.rarity);
    if (options?.search) params.set("search", options.search);
    if (options?.lang) params.set("lang", options.lang);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<Shop>(`/shop${query}`);
  }
}
