import { FortniteAPI } from "../client";
import { WeaponsResponse, RarityDefinitionsResponse, AvailablePatchesResponse } from "../types";

export class WeaponsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get weapons data with optional filtering
   * @param options.patch - Patch version (e.g. "32.00"). Defaults to current patch.
   * @param options.category - Filter by category (e.g. Assault, Shotgun)
   * @param options.search - Search weapons by name
   * @param options.gamemode - Filter by gamemode: "BattleRoyale" or "ZeroBuild"
   * @param options.rarity - Filter by rarity (e.g. rare, epic, legendary)
   * @param options.type - Filter by weapon type (e.g. ranged, melee)
   * @param options.ammoType - Filter by ammo type (e.g. light, medium, heavy)
   * @param options.itemType - Filter by item type
   * @param options.lang - Language code (default: en)
   */
  async getWeapons(options?: {
    patch?: string;
    category?: string;
    search?: string;
    gamemode?: string;
    rarity?: string;
    type?: string;
    ammoType?: string;
    itemType?: string;
    lang?: string;
  }): Promise<WeaponsResponse> {
    const params = new URLSearchParams();
    if (options?.patch) params.set("patch", options.patch);
    if (options?.category) params.set("category", options.category);
    if (options?.search) params.set("search", options.search);
    if (options?.gamemode) params.set("gamemode", options.gamemode);
    if (options?.rarity) params.set("rarity", options.rarity);
    if (options?.type) params.set("type", options.type);
    if (options?.ammoType) params.set("ammoType", options.ammoType);
    if (options?.itemType) params.set("itemType", options.itemType);
    if (options?.lang) params.set("lang", options.lang);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<WeaponsResponse>(`/weapons${query}`, {}, "v2");
  }

  /**
   * Get all available weapon patches, with the current patch flagged
   */
  async getAvailablePatches(): Promise<AvailablePatchesResponse> {
    return this.client.request<AvailablePatchesResponse>("/weapons/patches", {}, "v2");
  }

  /**
   * Get rarity definitions and their display colors
   */
  async getRarityDefinitions(): Promise<RarityDefinitionsResponse> {
    return this.client.request<RarityDefinitionsResponse>("/weapons/rarity", {}, "v2");
  }
}
