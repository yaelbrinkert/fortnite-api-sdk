import { FortniteAPI } from "../client";
import {
  Tournament,
  Leaderboard,
  TournamentTrackerResponse,
  TournamentEligibilityResponse,
} from "../types";

export class TournamentsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current events
   * No parameters needed - uses API's default account
   */
  async getCurrent(): Promise<any> {
    return this.client.request("/events/data/current");
  }

  /**
   * Get past events
   * No parameters needed - uses API's default account
   */
  async getPast(): Promise<any> {
    return this.client.request("/events/data/past");
  }

  /**
   * Get global events with metadata
   */
  async getGlobal(): Promise<any> {
    return this.client.request("/events/global");
  }

  async getSessions(params: { eventId: string }): Promise<any> {
    const { eventId } = params;
    return this.client.request(`/events/sessions?eventId=${eventId}`);
  }

  /**
   * Download events for a specific account
   * Requires user's own Fortnite token
   * @param params.accountId - Epic Games Account ID
   * @param params.region - Region (EU, NAE, NAW, etc.)
   * @param params.platform - Platform (Windows, PlayStation, etc.)
   * @param fortniteToken - User's Fortnite access token (from OAuth flow)
   */
  async download(
    params: {
      accountId: string;
      region: string;
      platform: string;
    },
    fortniteToken: string,
  ): Promise<any> {
    const query = new URLSearchParams({
      accountId: params.accountId,
      region: params.region,
      platform: params.platform,
    }).toString();

    return this.client.request(`/events/download?${query}`, {
      headers: {
        "x-fortnite-token": fortniteToken,
      },
    });
  }

  /**
   * Get tournament leaderboard
   * @param params.eventId - Event ID
   * @param params.eventWindowId - Event window ID
   * @param params.page - Page number (default: 0)
   * @param params.leaderboardDef - Optional leaderboard definition
   * @param params.accountId - Optional account ID to highlight
   * @param fortniteToken - Optional user's Fortnite token for personalized view
   */
  async getLeaderboard(
    params: {
      eventId: string;
      eventWindowId: string;
      page?: number;
      leaderboardDef?: string;
      accountId?: string;
    },
    fortniteToken?: string,
  ): Promise<Leaderboard> {
    const {
      eventId,
      eventWindowId,
      page = 0,
      leaderboardDef,
      accountId,
    } = params;

    const query = new URLSearchParams({
      eventId,
      eventWindowId,
      page: page.toString(),
    });

    if (leaderboardDef) {
      query.append("leaderboardDef", leaderboardDef);
    }

    if (accountId) {
      query.append("accountId", accountId);
    }

    const options = fortniteToken
      ? {
          headers: {
            "x-fortnite-token": fortniteToken,
          },
        }
      : undefined;

    return this.client.request<Leaderboard>(
      `/events/leaderboard?${query.toString()}`,
      options,
    );
  }

  /**
   * Get tournament participation history for a player
   * Requires user's own Fortnite token
   * @param accountId - Epic Games Account ID
   * @param fortniteToken - User's Fortnite access token (from OAuth flow)
   */
  async getTracker(
    accountId: string,
    fortniteToken: string,
  ): Promise<TournamentTrackerResponse> {
    return this.client.request<TournamentTrackerResponse>(
      `/tournament-tracker?accountId=${accountId}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
    );
  }

  /**
   * Check if a player is eligible for major tournaments
   * Requires user's own Fortnite token
   * @param accountId - Epic Games Account ID
   * @param fortniteToken - User's Fortnite access token (from OAuth flow)
   * @param options - Optional configuration for eligibility check
   * @param options.days - Number of days to check (default: 180, max: 365)
   * @param options.requiredTournaments - Required tournaments for eligibility (default: 14, max: 50)
   */
  async checkEligibility(
    accountId: string,
    fortniteToken: string,
    options?: {
      days?: number;
      requiredTournaments?: number;
    },
  ): Promise<TournamentEligibilityResponse> {
    const params = new URLSearchParams({ accountId });

    if (options?.days) {
      params.append("days", options.days.toString());
    }

    if (options?.requiredTournaments) {
      params.append(
        "requiredTournaments",
        options.requiredTournaments.toString(),
      );
    }

    return this.client.request<TournamentEligibilityResponse>(
      `/tournament-eligibility?${params.toString()}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
    );
  }

  /**
   * Get tournament leaderboard using V2 endpoint (POST with teams body)
   *
   * This is an enhanced version of the leaderboard endpoint that accepts a POST request
   * with a teams array in the body. Use this endpoint when you need to query leaderboard
   * data for multiple teams at once or for Ranked Cups that require specific team lookups.
   *
   * **Differences from V1**:
   * - Uses POST method instead of GET
   * - Accepts teams array in request body
   * - Better suited for bulk team queries
   * - Required for certain Ranked Cup leaderboards
   *
   * **Authentication**: Optional. Include fortniteToken for personalized leaderboard views
   *
   * **API Version**: v2
   *
   * **Rate Limit**: Standard API rate limits apply
   *
   * @param params - Leaderboard query parameters
   * @param params.eventId - Event ID (e.g., "epicgames_S37_BlitzCupsAllPlatforms_BR")
   * @param params.eventWindowId - Event window ID (e.g., "S37_BlitzCupsAllPlatforms_Event1_BR")
   * @param params.leaderboardDef - Optional leaderboard definition ID (required for Ranked Cups with multiple leaderboards)
   * @param teams - Array of team member account ID arrays. Each team is an array of account IDs.
   *                For solo events: [["accountId1"], ["accountId2"]]
   *                For duo events: [["player1Id", "player2Id"], ["player3Id", "player4Id"]]
   * @param fortniteToken - Optional user's Fortnite access token for personalized leaderboard view
   *
   * @returns Promise resolving to leaderboard data with entries, ranks, and stats
   *
   * @throws {FortniteAPIError} When the request fails (invalid event, missing leaderboardDef, etc.)
   *
   * @example
   * ```typescript
   * // Get leaderboard for multiple solo players
   * const leaderboard = await client.tournaments.getLeaderboardV2(
   *   {
   *     eventId: "epicgames_S37_BlitzCupsAllPlatforms_BR",
   *     eventWindowId: "S37_BlitzCupsAllPlatforms_Event1_BR"
   *   },
   *   [
   *     ["accountId1"],
   *     ["accountId2"],
   *     ["accountId3"]
   *   ]
   * );
   *
   * // For duo tournament
   * const duoLeaderboard = await client.tournaments.getLeaderboardV2(
   *   {
   *     eventId: "epicgames_S37_DuoCup_BR",
   *     eventWindowId: "S37_DuoCup_Event1_BR"
   *   },
   *   [
   *     ["player1Id", "player2Id"],
   *     ["player3Id", "player4Id"]
   *   ]
   * );
   *
   * // For Ranked Cup with leaderboardDef
   * const rankedLeaderboard = await client.tournaments.getLeaderboardV2(
   *   {
   *     eventId: "epicgames_S37_RankedCup_BR",
   *     eventWindowId: "S37_RankedCup_Event1_BR",
   *     leaderboardDef: "ranked_br_division_7"
   *   },
   *   [["accountId1"], ["accountId2"]]
   * );
   * ```
   */
  async getLeaderboardV2(
    params: {
      eventId: string;
      eventWindowId: string;
      leaderboardDef?: string;
    },
    teams: string[][],
    fortniteToken?: string,
  ): Promise<Leaderboard> {
    const query = new URLSearchParams({
      eventId: params.eventId,
      eventWindowId: params.eventWindowId,
    });

    if (params.leaderboardDef) {
      query.append("leaderboardDef", params.leaderboardDef);
    }

    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ teams }),
    };

    if (fortniteToken) {
      options.headers = {
        "x-fortnite-token": fortniteToken,
      };
    }

    return this.client.request<Leaderboard>(
      `/events/leaderboard?${query.toString()}`,
      options,
      "v2",
    );
  }
}
