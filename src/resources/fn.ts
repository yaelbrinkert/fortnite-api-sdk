import { FortniteAPI } from "../client";
import {
  BRInventory,
  Keychain,
  Receipt,
  EnabledFeatures,
  VersionCheck,
  PrivacySettings,
  EntitlementCheck,
} from "../types";

export class FNResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get Battle Royale inventory (V-Bucks and currency)
   * @param accountId - Epic Games account ID
   * @param fortniteToken - Optional user Fortnite token
   */
  async getBRInventory(
    accountId: string,
    fortniteToken?: string
  ): Promise<BRInventory> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<BRInventory>(
      `/fn/br-inventory/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get storefront encryption keychain
   */
  async getKeychain(): Promise<Keychain> {
    return this.client.request<Keychain>("/fn/keychain", {}, "v2");
  }

  /**
   * Get purchase receipts for an account
   * @param accountId - Epic Games account ID
   * @param fortniteToken - Optional user Fortnite token
   */
  async getReceipts(
    accountId: string,
    fortniteToken?: string
  ): Promise<Receipt[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<Receipt[]>(
      `/fn/receipts/${accountId}`,
      { headers },
      "v2"
    );
  }

  /**
   * Get currently enabled game features
   */
  async getEnabledFeatures(): Promise<EnabledFeatures> {
    return this.client.request<EnabledFeatures>(
      "/fn/enabled-features",
      {},
      "v2"
    );
  }

  /**
   * Check game version
   * @param platform - Platform name (Windows, Mac, etc.)
   * @param version - Version string to check
   */
  async checkVersion(
    platform: string,
    version: string
  ): Promise<VersionCheck> {
    return this.client.request<VersionCheck>(
      `/fn/version/${platform}?version=${encodeURIComponent(version)}`,
      {},
      "v2"
    );
  }

  /**
   * Get privacy settings for an account (requires user token)
   * @param accountId - Epic Games account ID
   * @param fortniteToken - User Fortnite token (required)
   */
  async getPrivacySettings(
    accountId: string,
    fortniteToken: string
  ): Promise<PrivacySettings> {
    return this.client.request<PrivacySettings>(
      `/fn/privacy/${accountId}`,
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
      "v2"
    );
  }

  /**
   * Update privacy settings for an account (requires user token)
   * @param accountId - Epic Games account ID
   * @param settings - Privacy settings to update
   * @param fortniteToken - User Fortnite token (required)
   */
  async updatePrivacySettings(
    accountId: string,
    settings: Partial<PrivacySettings>,
    fortniteToken: string
  ): Promise<PrivacySettings> {
    return this.client.request<PrivacySettings>(
      `/fn/privacy/${accountId}`,
      {
        method: "POST",
        headers: {
          "x-fortnite-token": fortniteToken,
        },
        body: JSON.stringify(settings),
      },
      "v2"
    );
  }

  /**
   * Check Fortnite entitlement (requires user token)
   * @param fortniteToken - User Fortnite token (required)
   */
  async checkEntitlement(fortniteToken: string): Promise<EntitlementCheck> {
    return this.client.request<EntitlementCheck>(
      "/fn/entitlement",
      {
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
      "v2"
    );
  }

  /**
   * Request Fortnite entitlement access (requires user token)
   * @param accountId - Epic Games account ID
   * @param fortniteToken - User Fortnite token (required)
   */
  async requestEntitlement(
    accountId: string,
    fortniteToken: string
  ): Promise<void> {
    await this.client.request<void>(
      `/fn/entitlement/${accountId}`,
      {
        method: "POST",
        headers: {
          "x-fortnite-token": fortniteToken,
        },
      },
      "v2"
    );
  }
}
