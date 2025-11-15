import { FortniteAPI } from "../client";
import { BattlePass } from "../types";

export class BattlePassResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current battle pass items
   */
  async getBattlePass(): Promise<BattlePass> {
    return this.client.request<BattlePass>("/battlepass");
  }
}
