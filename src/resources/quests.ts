import { FortniteAPI } from "../client";
import { QuestsResponse } from "../types";

/**
 * QuestsResource provides access to Fortnite quests and account progression data
 *
 * This resource allows you to fetch player quest progress, XP, playtime, and account level.
 * All methods require the user's personal Fortnite OAuth token obtained through the OAuth flow.
 *
 * @example
 * ```typescript
 * // Get quests for an account
 * const quests = await client.quests.getQuests(
 *   "account-id-here",
 *   "user-fortnite-token-here"
 * );
 * ```
 */
export class QuestsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get account quests and level information
   *
   * Retrieves comprehensive quest data including:
   * - Active quest progress and completion status
   * - Account XP and level information
   * - Total playtime statistics
   * - Quest rewards and milestones
   *
   * **Authentication**: Requires user's personal Fortnite OAuth token
   *
   * **API Version**: v3
   *
   * **Rate Limit**: Standard API rate limits apply
   *
   * @param accountId - Epic Games Account ID (32 character hexadecimal string)
   * @param fortniteToken - User's Fortnite access token obtained from OAuth flow
   *
   * @returns Promise resolving to quest progress, XP, playtime, and account level data
   *
   * @throws {FortniteAPIError} When the request fails (invalid token, account not found, etc.)
   *
   * @example
   * ```typescript
   * const accountId = "a1b2c3d4e5f6..."; // 32 character account ID
   * const token = "eg1~..."; // User's Fortnite OAuth token
   *
   * const questData = await client.quests.getQuests(accountId, token);
   * console.log(questData);
   * ```
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
