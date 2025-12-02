import { FortniteAPI } from "../client";
import { QuestsResponse } from "../types";

export class QuestsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get account quests and level information
   * Requires user's own Fortnite token
   * @param accountId - Epic Games Account ID
   * @param fortniteToken - User's Fortnite access token (from OAuth flow)
   * @returns Quest progress, XP, playtime, and account level data
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
      "v3"
    );
  }
}
