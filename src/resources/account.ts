import { FortniteAPI } from "../client";
import {
  Account,
  ExternalAuth,
  BulkExternalDisplayNameRequest,
  BulkExternalIdRequest,
} from "../types";

export class AccountResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Lookup account by Account ID
   * @param accountId - Epic Games account ID
   * @param fortniteToken - Optional user Fortnite token
   */
  async getById(accountId: string, fortniteToken?: string): Promise<Account> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<Account>(
      `/account/${accountId}`,
      { headers },
      "v1"
    );
  }

  /**
   * Bulk account lookup by Account IDs
   * @param accountIds - Array of Epic Games account IDs (max 100)
   */
  async getBulk(accountIds: string[]): Promise<Account[]> {
    const queryString = accountIds
      .map((id) => `accountId=${encodeURIComponent(id)}`)
      .join("&");
    return this.client.request<Account[]>(
      `/account/bulk?${queryString}`,
      {},
      "v1"
    );
  }

  /**
   * Lookup account by Epic display name
   * @param displayName - Epic Games display name
   * @param fortniteToken - Optional user Fortnite token
   */
  async getByDisplayName(
    displayName: string,
    fortniteToken?: string
  ): Promise<Account> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<Account>(
      `/account/displayName/${encodeURIComponent(displayName)}`,
      { headers },
      "v1"
    );
  }

  /**
   * Cross-platform account lookup by external display name
   * @param platform - Platform type (psn, xbl, steam, nintendo, twitch, github)
   * @param displayName - Platform display name
   * @param caseInsensitive - Case-insensitive search (default: false)
   * @param fortniteToken - Optional user Fortnite token
   */
  async getByExternalDisplayName(
    platform: string,
    displayName: string,
    caseInsensitive: boolean = false,
    fortniteToken?: string
  ): Promise<Account> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    const query = caseInsensitive ? "?caseInsensitive=true" : "";
    return this.client.request<Account>(
      `/account/external/${platform}/displayName/${encodeURIComponent(
        displayName
      )}${query}`,
      { headers },
      "v1"
    );
  }

  /**
   * Bulk external display name lookup
   * @param payload - Array of platform/displayName pairs (max 100)
   */
  async getBulkExternalDisplayNames(
    payload: BulkExternalDisplayNameRequest
  ): Promise<Account[]> {
    return this.client.request<Account[]>(
      `/account/external/displayNames/bulk`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      "v1"
    );
  }

  /**
   * Bulk external ID lookup
   * @param payload - Array of platform/externalId pairs (max 100)
   */
  async getBulkExternalIds(
    payload: BulkExternalIdRequest
  ): Promise<Account[]> {
    return this.client.request<Account[]>(
      `/account/external/ids/bulk`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      "v1"
    );
  }

  /**
   * Get all external authentications for an account
   * @param accountId - Epic Games account ID
   * @param fortniteToken - Optional user Fortnite token
   */
  async getExternalAuths(
    accountId: string,
    fortniteToken?: string
  ): Promise<ExternalAuth[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<ExternalAuth[]>(
      `/account/${accountId}/externalAuths`,
      { headers },
      "v1"
    );
  }

  /**
   * Get specific external authentication for an account
   * @param accountId - Epic Games account ID
   * @param platform - Platform type (psn, xbl, steam, nintendo, twitch, github)
   * @param fortniteToken - Optional user Fortnite token
   */
  async getExternalAuth(
    accountId: string,
    platform: string,
    fortniteToken?: string
  ): Promise<ExternalAuth> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<ExternalAuth>(
      `/account/${accountId}/externalAuths/${platform}`,
      { headers },
      "v1"
    );
  }
}
