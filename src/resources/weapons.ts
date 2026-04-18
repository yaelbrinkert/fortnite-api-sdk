import { FortniteAPI } from "../client";
import { WeaponsResponse, RarityDefinitionsResponse } from "../types";

export class WeaponsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get weapons data with optional filtering
   * @param options - Query options
   * @param options.version - Version filter: "current" (loot pool), "all" (every weapon), or a specific patch like "39.50"
   * @param options.category - Filter by category: assault-rifle, shotgun, smg, sniper, pistol, explosive, bow, crossbow, melee, light-machine-gun
   * @param options.search - Search weapons by name (e.g. "pump", "assault", "bolt")
   * @param options.gamemode - Filter by gamemode: "br" (Battle Royale) or "og" (OG mode)
   * @param options.rarity - Filter by rarity: common, uncommon, rare, epic, legendary, mythic, transcendent
   * @param options.type - Filter by weapon type: ranged, melee, consumable, trap, gadget
   * @param options.ammoType - Filter by ammo type: light, medium, heavy, shells, rockets, energy, arrows
   * @param options.season - Filter by season availability: "CH6S7" or "6.7" format
   * @returns Weapons response with metadata, availableSeasons, and weapon data
   */
  async getWeapons(options?: {
    version?: string;
    category?: string;
    search?: string;
    gamemode?: "br" | "og";
    rarity?: string;
    type?: string;
    ammoType?: string;
    season?: string;
  }): Promise<WeaponsResponse> {
    const params = new URLSearchParams();
    if (options?.version) params.set("version", options.version);
    if (options?.category) params.set("category", options.category);
    if (options?.search) params.set("search", options.search);
    if (options?.gamemode) params.set("gamemode", options.gamemode);
    if (options?.rarity) params.set("rarity", options.rarity);
    if (options?.type) params.set("type", options.type);
    if (options?.ammoType) params.set("ammoType", options.ammoType);
    if (options?.season) params.set("season", options.season);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<WeaponsResponse>(`/weapons${query}`, {}, "v2");
  }

  /**
   * Get rarity definitions (colors, display names, backend values)
   */
  async getRarityDefinitions(): Promise<RarityDefinitionsResponse> {
    return this.client.request<RarityDefinitionsResponse>("/weapons/rarity", {}, "v2");
  }
}
