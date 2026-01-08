import { FortniteAPI } from "../client";
import { CrewPackResponse, CrewHistoryResponse } from "../types";

export class CrewResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current month's Crew Pack
   */
  async getCurrent(): Promise<CrewPackResponse> {
    return this.client.request<CrewPackResponse>("/crew/current");
  }

  /**
   * Get Crew Pack history
   */
  async getHistory(): Promise<CrewHistoryResponse> {
    return this.client.request<CrewHistoryResponse>("/crew/history");
  }
}
