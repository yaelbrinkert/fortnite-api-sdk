import { FortniteAPI } from "../client";
import { BattlePass } from "../types";

export class BattlePassResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current Battle Pass content and rewards
   * @param lang - Language code (default: en)
   */
  async getBattlePass(lang?: string): Promise<BattlePass> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<BattlePass>(`/shop/battlepass${query}`);
  }
}
