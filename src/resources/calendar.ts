import { FortniteAPI } from "../client";
import { SeasonInfo } from "../types";

export class CalendarResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current season information
   */
  async getCurrentSeason(): Promise<SeasonInfo> {
    return this.client.request<SeasonInfo>("/season");
  }
}
