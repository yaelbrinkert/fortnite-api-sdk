import { FortniteAPI } from "../client";
import {
  EventLeaderboard,
  PlayerTokensResponse,
  PlayerWindowStanding,
} from "../types";

/**
 * Events Resource
 * Handles tournament and competitive events leaderboard data
 */
export class EventsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get the paginated leaderboard for a specific event window
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param options - Query options
   * @param fortniteToken - Optional user Fortnite token
   * @returns Leaderboard data
   */
  async getLeaderboard(
    eventId: string,
    eventWindowId: string,
    options?: { page?: number; leaderboardDef?: string },
    fortniteToken?: string
  ): Promise<EventLeaderboard> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    const params = new URLSearchParams();
    if (options?.page != null) params.append("page", String(options.page));
    if (options?.leaderboardDef) params.append("leaderboardDef", options.leaderboardDef);
    const qs = params.toString();
    return this.client.request<EventLeaderboard>(
      `/events/${eventId}/windows/${eventWindowId}/leaderboard${qs ? `?${qs}` : ""}`,
      { headers },
      "v2"
    );
  }

  /**
   * Find a player's rank and surrounding entries in an event window leaderboard.
   * Works for any placement including beyond top 10k. No user token required.
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param accountId - Epic account ID of the player to look up
   */
  async getPlayerLeaderboard(
    eventId: string,
    eventWindowId: string,
    accountId: string
  ): Promise<EventLeaderboard> {
    return this.client.request<EventLeaderboard>(
      `/events/${eventId}/windows/${eventWindowId}/leaderboard/player?accountId=${encodeURIComponent(accountId)}`,
      {},
      "v2"
    );
  }

  /**
   * Get a player's standing in a specific event window.
   *
   * Uses Epic's dedicated player endpoint — no leaderboard page scanning required.
   * Returns rank, score, and full session history for the player directly.
   * No user token required — uses service auth.
   *
   * @param eventId - Event identifier (e.g. `"epicgames_S40_FNCSMajor1_PlayInStage_EU"`)
   * @param eventWindowId - Event window identifier (e.g. `"S40_FNCSMajor1_PlayInStage_Day1_EU"`)
   * @param accountId - Epic account ID of the player
   */
  async getPlayerWindowStanding(
    eventId: string,
    eventWindowId: string,
    accountId: string
  ): Promise<PlayerWindowStanding> {
    return this.client.request<PlayerWindowStanding>(
      `/events/${encodeURIComponent(eventId)}/windows/${encodeURIComponent(eventWindowId)}/players/${encodeURIComponent(accountId)}`,
      {},
      "v2"
    );
  }

  /**
   * Get the raw token set for one or more players.
   * Tokens are eligibility flags earned by participating in tournaments
   * (e.g. qualifying tokens, ban tokens).
   * No user token required — uses service auth.
   * @param accountIds - One or more Epic account IDs
   */
  async getPlayerTokens(accountIds: string | string[]): Promise<PlayerTokensResponse> {
    const ids = Array.isArray(accountIds) ? accountIds : [accountIds];
    const qs = ids.map(encodeURIComponent).join("%2C");
    return this.client.request<PlayerTokensResponse>(
      `/events/tokens?teamAccountIds=${qs}`,
      {},
      "v1"
    );
  }
}
