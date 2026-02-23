import { FortniteAPI } from "../client";
import { WeaponsResponse } from "../types";

export class WeaponsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get weapons data with optional filtering
   * @param options - Query options
   * @param options.version - Version filter: "current" (current season), "all" (every weapon), "unversioned", or a specific version like "39.50"
   * @param options.category - Filter by category: assault-rifles, shotguns, smgs, snipers, pistols, explosives, marksman-rifles, bows, crossbows, melee, light-machine-guns
   * @param options.search - Search weapons by name (e.g. "pump", "assault", "bolt")
   * @returns Weapons response with metadata and data
   */
  async getWeapons(options?: {
    version?: string;
    category?: string;
    search?: string;
  }): Promise<WeaponsResponse> {
    const params = new URLSearchParams();
    if (options?.version) params.set("version", options.version);
    if (options?.category) params.set("category", options.category);
    if (options?.search) params.set("search", options.search);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<WeaponsResponse>(`/weapons${query}`, {}, "v2");
  }
}
