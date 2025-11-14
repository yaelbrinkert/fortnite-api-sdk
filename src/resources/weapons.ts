import { FortniteAPI } from "../client";
import { Weapons } from "../types";

export class WeaponsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get weapons and infos
   */
  async getWeapons(): Promise<Weapons> {
    return this.client.request<Weapons>("/weapons");
  }
}
