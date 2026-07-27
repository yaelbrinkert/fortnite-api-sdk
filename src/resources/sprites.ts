import { FortniteAPI } from "../client";
import { SpritesResponse, SpriteResponse, SpriteBoonsResponse } from "../types";

export class SpritesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get the full sprite catalog: families with nested variants, current + PAK-base
   * drop weights, normalized drop chances, rarity, icons, boons, the level-up XP
   * curve, and alternate event weight sets. Drop weights include Epic's live hotfix
   * overlay, so Power-Hour / event rotations are reflected without a game update.
   * @param options.search - Filter by sprite name or id (family or variant, contains match)
   * @param options.rarity - Filter by rarity (e.g. epic, legendary)
   * @param options.variant - Filter to one variant label across families (base, gold, candy, galaxy, gem, holofoil, cube)
   */
  async getSprites(options?: {
    search?: string;
    rarity?: string;
    variant?: string;
  }): Promise<SpritesResponse> {
    const params = new URLSearchParams();
    if (options?.search) params.set("search", options.search);
    if (options?.rarity) params.set("rarity", options.rarity);
    if (options?.variant) params.set("variant", options.variant);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<SpritesResponse>(`/sprites${query}`, {}, "v2");
  }

  /**
   * Get a single sprite family by family id (e.g. "DuckSprite"), variant id
   * (e.g. "DuckSprite_Variant_Gold"), or display name (e.g. "Duck Sprite").
   */
  async getSprite(id: string): Promise<SpriteResponse> {
    return this.client.request<SpriteResponse>(
      `/sprites/${encodeURIComponent(id)}`,
      {},
      "v2"
    );
  }

  /**
   * Get all SpriteBoons perks with names and descriptions.
   */
  async getBoons(): Promise<SpriteBoonsResponse> {
    return this.client.request<SpriteBoonsResponse>("/sprites/boons", {}, "v2");
  }
}
