import { FortniteAPI } from "../client";
import { BattlePass } from "../types";

export class BattlePassResource {
  constructor(private client: FortniteAPI) {}

  /**
   * @deprecated Despite its name, GET /api/v1/shop/battlepass never returned the Battle Pass:
   * it returns Epic's legacy "battleroyalenews" CMS block, which Epic stopped updating in 2021.
   * For current lobby news use `client.news.getBRNews()`; for the Battle Pass call
   * GET /api/v2/battlepass.
   * @param lang - Language code (default: en)
   */
  async getBattlePass(lang?: string): Promise<BattlePass> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<BattlePass>(`/shop/battlepass${query}`);
  }
}
