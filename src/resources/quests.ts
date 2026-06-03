import { FortniteAPI } from "../client";
import { QuestsResponse } from "../types";

export class QuestsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get active quests and challenges for a player. Requires x-fortnite-token.
   * @param accountId - Epic Games account ID
   * @param fortniteToken - User's Fortnite access token (required)
   */
  async getQuests(
    accountId: string,
    fortniteToken: string
  ): Promise<QuestsResponse> {
    return this.client.request<QuestsResponse>(
      `/quests/${accountId}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
      "v2"
    );
  }
}
