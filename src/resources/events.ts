import { FortniteAPI } from "../client";
import {
  EventWindows,
  PlayerEventHistory,
  TournamentDetails,
  ScoringRules,
  EventLeaderboard,
  PlayerEventData,
  EligibilityStatus,
  ArenaHype,
  EventRewards,
} from "../types";

/**
 * Events Resource
 * Handles tournament and competitive events data
 */
export class EventsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get event windows
   * @param eventId - Event ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Event windows data
   */
  async getEventWindows(
    eventId: string,
    fortniteToken?: string
  ): Promise<EventWindows> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<EventWindows>(
      `/events/${eventId}/windows`,
      { headers },
      "v2"
    );
  }

  /**
   * Get player event history
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of events player participated in
   */
  async getPlayerHistory(
    accountId: string,
    fortniteToken?: string
  ): Promise<PlayerEventHistory[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<PlayerEventHistory[]>(
      `/events/history/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get tournament details
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Tournament details
   */
  async getTournamentDetails(
    eventId: string,
    eventWindowId: string,
    fortniteToken?: string
  ): Promise<TournamentDetails> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<TournamentDetails>(
      `/events/${eventId}/windows/${eventWindowId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get event scoring rules
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Scoring rules
   */
  async getScoringRules(
    eventId: string,
    eventWindowId: string,
    fortniteToken?: string
  ): Promise<ScoringRules> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<ScoringRules>(
      `/events/${eventId}/windows/${eventWindowId}/scoring`,
      { headers },
      "v2"
    );
  }

  /**
   * Get event leaderboard
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param options - Query options
   * @param fortniteToken - Optional user Fortnite token
   * @returns Leaderboard data
   */
  async getLeaderboard(
    eventId: string,
    eventWindowId: string,
    options?: { page?: number },
    fortniteToken?: string
  ): Promise<EventLeaderboard> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    const query = options?.page ? `?page=${options.page}` : "";
    return this.client.request<EventLeaderboard>(
      `/events/${eventId}/windows/${eventWindowId}/leaderboard${query}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get player event data
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Player's event performance data
   */
  async getPlayerEventData(
    eventId: string,
    eventWindowId: string,
    accountId: string,
    fortniteToken?: string
  ): Promise<PlayerEventData> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<PlayerEventData>(
      `/events/${eventId}/windows/${eventWindowId}/players/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Check tournament eligibility
   * @param accountId - Account ID
   * @param eventId - Event ID
   * @param fortniteToken - User Fortnite token (REQUIRED)
   * @returns Eligibility status
   */
  async checkEligibility(
    accountId: string,
    eventId: string,
    fortniteToken: string
  ): Promise<EligibilityStatus> {
    const headers: Record<string, string> = {
      "x-fortnite-token": fortniteToken,
    };
    return this.client.request<EligibilityStatus>(
      `/events/${eventId}/eligibility/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get Arena hype and division
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Arena hype, division, and progress
   */
  async getArenaHype(
    accountId: string,
    fortniteToken?: string
  ): Promise<ArenaHype> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<ArenaHype>(
      `/events/arena/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get event rewards/prizes
   * @param eventId - Event ID
   * @param eventWindowId - Event window ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Event rewards structure
   */
  async getEventRewards(
    eventId: string,
    eventWindowId: string,
    fortniteToken?: string
  ): Promise<EventRewards> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<EventRewards>(
      `/events/${eventId}/windows/${eventWindowId}/rewards`,
      { headers },
      "v2"
    );
  }
}
