import { FortniteAPI } from "../client";
import {
  ProfileLevel,
  RankedProgress,
  TrackDefinition,
} from "../types";

export class ProfilesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get raw Habanero track progress for a single account. Public — no token required.
   * @param accountId - Epic account ID
   */
  async getProgress(accountId: string): Promise<any> {
    return this.client.request<any>(
      `/profile/progress?accountId=${encodeURIComponent(accountId)}`
    );
  }

  /**
   * Get a player's XP, level, accountLevel, and battle pass tier.
   * Parsed from QueryProfile (profileId=athena) on the MCP service.
   * Requires the player's own Fortnite OAuth token — cannot be used for other accounts.
   * @param accountId - Epic account ID
   * @param fortniteToken - User's Fortnite OAuth token (required)
   */
  async getLevel(accountId: string, fortniteToken: string): Promise<ProfileLevel> {
    return this.client.request<ProfileLevel>(
      `/profile/level?accountId=${encodeURIComponent(accountId)}`,
      { headers: { "x-fortnite-token": fortniteToken } }
    );
  }

  /**
   * Get enriched ranked progress — human-readable rank names, game mode labels, season dates.
   * Accepts either a display name or an account ID. Account ID is preferred: it is faster
   * (skips the name→ID lookup) and is not affected by display name changes.
   * @param displayName - Epic Games display name (ignored if accountId is provided)
   * @param options - Optional: pass `accountId` to bypass the name lookup
   */
  async getRanked(
    displayName: string,
    options?: { accountId?: string }
  ): Promise<RankedProgress[]> {
    const params = new URLSearchParams();
    if (options?.accountId) {
      params.append("accountId", options.accountId);
    } else {
      params.append("displayName", displayName);
    }
    return this.client.request<RankedProgress[]>(
      `/profile/ranked?${params.toString()}`
    );
  }

  /**
   * Get all available ranked game mode tracks — modes, division counts, and season dates.
   * @param options - Optional filters
   */
  async getTracks(options?: {
    /** ISO 8601 — only return tracks ending before this date */
    endsBefore?: string;
    /** ISO 8601 — only return tracks ending after this date */
    endsAfter?: string;
  }): Promise<TrackDefinition[]> {
    const params = new URLSearchParams();
    if (options?.endsBefore) params.append("endsBefore", options.endsBefore);
    if (options?.endsAfter) params.append("endsAfter", options.endsAfter);
    const qs = params.toString();
    return this.client.request<TrackDefinition[]>(
      `/profile/tracks${qs ? `?${qs}` : ""}`
    );
  }

  /**
   * Get ranked track progress for multiple account IDs in one request (L3AGUE bulk endpoint).
   * @param accountIds - Array of Epic account IDs
   */
  async getBulkTrackProgress(accountIds: string[]): Promise<any[]> {
    return this.client.request<any[]>(
      "/profile/trackprogress/bulk",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountIds),
      }
    );
  }

  /**
   * Get a Habanero game leaderboard centered around an account.
   * @param gameId - Habanero game identifier (e.g. "HazelnutSpread")
   * @param accountId - Epic account ID to center the leaderboard around
   * @param options - Query options
   */
  async getGameLeaderboard(
    gameId: string,
    accountId: string,
    options?: { fromIndex?: number; findTeams?: boolean }
  ): Promise<any> {
    const params = new URLSearchParams({ accountId });
    if (options?.fromIndex != null) params.append("fromIndex", String(options.fromIndex));
    if (options?.findTeams != null) params.append("findTeams", String(options.findTeams));
    return this.client.request<any>(
      `/profile/leaderboard/${encodeURIComponent(gameId)}?${params.toString()}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }
    );
  }
}
