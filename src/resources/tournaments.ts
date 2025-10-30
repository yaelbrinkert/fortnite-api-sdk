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
   */
  async getCurrent(params?: { accountId?: string }): Promise<any> {
    const queryString = params?.accountId
      ? `?accountId=${params.accountId}`
      : "";
    return this.client.request(`/events/data/current${queryString}`);
  }

  /**
   * Get past events
   */
  async getPast(params?: { accountId?: string }): Promise<any> {
    const queryString = params?.accountId
      ? `?accountId=${params.accountId}`
      : "";
    return this.client.request(`/events/data/past${queryString}`);
  }

  /**
   * Get global events
   */
  async getGlobal(): Promise<any> {
    return this.client.request("/events/global");
  }

  /**
   * Get tournament leaderboard
   */
  async getLeaderboard(params: {
    eventId: string;
    eventWindowId: string;
    page?: number;
    leaderboardDef?: string;
  }): Promise<Leaderboard> {
    const { eventId, eventWindowId, page = 0, leaderboardDef } = params;
    const query = new URLSearchParams({
      eventId,
      eventWindowId,
      page: page.toString(),
      ...(leaderboardDef && { leaderboardDef }),
    }).toString();

    return this.client.request<Leaderboard>(`/events/leaderboard?${query}`);
  }

  /**
   * Get tournament participation history for a player
   * GET /tournament-tracker
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
   * GET /tournament-eligibility
   * @param accountId - Epic Games Account ID
   * @param fortniteToken - User's Fortnite access token (from OAuth flow)
   * @param options - Optional configuration for eligibility check
   */
  async checkEligibility(
    accountId: string,
    fortniteToken: string,
    options?: {
      days?: number; // Default: 180
      requiredTournaments?: number; // Default: 14
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
}
