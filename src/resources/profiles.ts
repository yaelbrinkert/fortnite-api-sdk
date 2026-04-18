import { FortniteAPI } from "../client";

export class ProfilesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get profile progress (track progress, levels) by display name
   * @param displayName - Epic Games display name
   */
  async getProgress(displayName: string): Promise<any> {
    return this.client.request(
      `/profile/progress?displayName=${encodeURIComponent(displayName)}`
    );
  }

  /**
   * Get enriched ranked progress by display name (human-readable ranks, game modes, season dates)
   * @param displayName - Epic Games display name
   */
  async getRanked(displayName: string): Promise<any> {
    return this.client.request(
      `/profile/ranked?displayName=${encodeURIComponent(displayName)}`
    );
  }
}
