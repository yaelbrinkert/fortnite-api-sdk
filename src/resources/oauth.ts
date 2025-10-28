import { FortniteAPI } from "../client";
import {
  OAuthCompleteResponse,
  OAuthDeviceRefreshResponse,
  OAuthFlowResponse,
  OAuthRefreshResponse,
} from "../types";

export class OauthResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Initiate OAuth flow - GET /oauth/get-token
   * Returns a verification URL for the user to authenticate
   */
  async getToken(): Promise<OAuthFlowResponse> {
    return this.client.request<OAuthFlowResponse>("/oauth/get-token");
  }

  /**
   * Complete OAuth flow - POST /oauth/complete
   * Call this after user has visited the verification URL
   */
  async completeOauth(flowId: string): Promise<OAuthCompleteResponse> {
    return this.client.request<OAuthCompleteResponse>("/oauth/complete", {
      method: "POST",
      body: JSON.stringify({ flowId }),
    });
  }

  /**
   * Refresh access token - POST /oauth/refresh-token
   * Use when access token expires (~2 hours)
   */
  async refreshToken(refreshToken: string): Promise<OAuthRefreshResponse> {
    return this.client.request<OAuthRefreshResponse>("/oauth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  /**
   * Refresh with device auth - POST /oauth/refresh-device
   * Use device auth credentials to get fresh tokens (never expires)
   */
  async refreshDevice(params: {
    accountId: string;
    deviceId: string;
    secret: string;
  }): Promise<OAuthDeviceRefreshResponse> {
    return this.client.request<OAuthDeviceRefreshResponse>(
      "/oauth/refresh-device",
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );
  }
}
