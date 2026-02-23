import { FortniteAPI } from "../client";
import { Profile, ProfileStats } from "../types";

export class ProfilesResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get profile progress (ranked divisions, levels) by display name
   * @param displayName - Epic Games display name
   */
  async getProgress(displayName: string): Promise<any> {
    return this.client.request(
      `/profile/progress?displayName=${encodeURIComponent(displayName)}`
    );
  }

  /**
   * Get profile stats by display name
   * @param displayName - Epic Games display name
   * @param timeWindow - Time period: "season" or "lifetime" (default: "lifetime")
   */
  async getStats(
    displayName: string,
    timeWindow?: "season" | "lifetime"
  ): Promise<ProfileStats> {
    const params = new URLSearchParams({
      displayName,
    });
    if (timeWindow) params.set("timeWindow", timeWindow);
    return this.client.request<ProfileStats>(
      `/profile/stats?${params.toString()}`
    );
  }

  /**
   * Get account info by ID
   * @param accountId - Epic Games Account ID
   */
  async getAccount(accountId: string): Promise<Profile> {
    return this.client.request<Profile>(`/account/${accountId}`);
  }

  /**
   * Get multiple display names by account IDs
   * @param accountIds - Array of account IDs (max 100)
   */
  async getDisplayNames(
    accountIds: string[]
  ): Promise<Record<string, string>> {
    const ids = accountIds.join(",");
    return this.client.request<Record<string, string>>(
      `/displaynames/multiple?ids=${encodeURIComponent(ids)}`
    );
  }
}
