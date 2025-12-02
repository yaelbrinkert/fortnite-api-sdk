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
    fortniteToken: string
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
    fortniteToken?: string
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
      options
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
    fortniteToken: string
  ): Promise<TournamentTrackerResponse> {
    return this.client.request<TournamentTrackerResponse>(
      `/tournament-tracker?accountId=${accountId}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      }
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
    }
  ): Promise<TournamentEligibilityResponse> {
    const params = new URLSearchParams({ accountId });

    if (options?.days) {
      params.append("days", options.days.toString());
    }

    if (options?.requiredTournaments) {
      params.append(
        "requiredTournaments",
        options.requiredTournaments.toString()
      );
    }

    return this.client.request<TournamentEligibilityResponse>(
      `/tournament-eligibility?${params.toString()}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      }
    );
  }

  /**
   * Get tournament leaderboard using V2 endpoint (POST with teams body)
   * @param params.eventId - Event ID
   * @param params.eventWindowId - Event window ID
   * @param params.leaderboardDef - Optional leaderboard definition (required for Ranked Cups)
   * @param teams - Array of team member account ID arrays (e.g., [["accountId1"], ["accountId2"]])
   * @param fortniteToken - Optional user's Fortnite token for personalized view
   */
  async getLeaderboardV2(
    params: {
      eventId: string;
      eventWindowId: string;
      leaderboardDef?: string;
    },
    teams: string[][],
    fortniteToken?: string
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
      "v2"
    );
  }
}
