import { FortniteAPI } from "../client";
import { Profile, ProfileStats } from "../types";

export class ProfilesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get profile progress by display name
   */
  async getProgress(displayName: string): Promise<any> {
    return this.client.request(`/profile/progress?displayName=${displayName}`);
  }

  /**
   * Get profile stats by display name
   */
  async getStats(displayName: string): Promise<ProfileStats> {
    return this.client.request<ProfileStats>(
      `/profile/stats?displayName=${displayName}`
    );
  }

  /**
   * Get account info by ID
   */
  async getAccount(accountId: string): Promise<Profile> {
    return this.client.request<Profile>(`/account/${accountId}`);
  }

  /**
   * Get multiple display names
   */
  async getDisplayNames(accountIds: string[]): Promise<Record<string, string>> {
    const ids = accountIds.join(",");
    return this.client.request<Record<string, string>>(
      `/displaynames/multiple?ids=${ids}`
    );
  }
}
