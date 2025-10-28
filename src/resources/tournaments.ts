import { FortniteAPI } from "../client";
import { Tournament, Leaderboard } from "../types";

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
}
