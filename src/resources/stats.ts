import { FortniteAPI } from "../client";
import {
  PlayerStats,
  BulkStatsRequest,
  BulkStatsResponse,
  LeaderboardResponse,
  LeaderboardOptions,
} from "../types";

/**
 * Stats Resource
 * Handles player statistics queries
 */
export class StatsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get player stats with optional filters
   * @param accountId - Account ID
   * @param options - Query options
   * @param fortniteToken - Optional user Fortnite token
   * @returns Player statistics
   */
  async getPlayerStats(
    accountId: string,
    options?: {
      /** Unix timestamp (e.g. 1773900001). NOT an ISO date string. */
      startTime?: string | number;
      /** Unix timestamp (e.g. 1782950340). NOT an ISO date string. */
      endTime?: string | number;
      stats?: string[];
    },
    fortniteToken?: string
  ): Promise<PlayerStats> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }

    const queryParams = new URLSearchParams();
    if (options?.startTime) queryParams.append("startTime", String(options.startTime));
    if (options?.endTime) queryParams.append("endTime", String(options.endTime));
    if (options?.stats) queryParams.append("stats", options.stats.join(","));

    const query = queryParams.toString();
    const url = `/stats/${accountId}${query ? `?${query}` : ""}`;

    return this.client.request<PlayerStats>(url, { headers }, "v2");
  }

  /**
   * Get bulk stats for multiple players
   * @param accountIds - Array of account IDs (max 100)
   * @param options - Query options
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of player statistics
   */
  async getBulkStats(
    accountIds: string[],
    options?: {
      stats?: string[];
    },
    fortniteToken?: string
  ): Promise<BulkStatsResponse[]> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }

    const body: BulkStatsRequest = {
      accountIds,
    };
    if (options?.stats) {
      body.stats = options.stats;
    }

    return this.client.request<BulkStatsResponse[]>(
      "/stats/bulk",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      },
      "v2"
    );
  }

  /**
   * Get leaderboard for specific stat
   * @param stat - Stat name to query
   * @param options - Query options
   * @param fortniteToken - Optional user Fortnite token
   * @returns Leaderboard data
   */
  async getLeaderboard(
    stat: string,
    options?: LeaderboardOptions,
    fortniteToken?: string
  ): Promise<LeaderboardResponse> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }

    const queryParams = new URLSearchParams();
    if (options?.limit) queryParams.append("limit", options.limit.toString());
    if (options?.offset)
      queryParams.append("offset", options.offset.toString());
    if (options?.window) queryParams.append("window", options.window);

    const query = queryParams.toString();
    const url = `/stats/leaderboard/${stat}${query ? `?${query}` : ""}`;

    return this.client.request<LeaderboardResponse>(url, { headers }, "v2");
  }
}
