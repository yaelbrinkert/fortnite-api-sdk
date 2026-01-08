import { FortniteAPI } from "../client";
import {
  FriendsSummary,
  Friend,
  FriendRequest,
  BlockedUser,
  FriendshipInfo,
  SuggestedFriend,
} from "../types";

/**
 * Friends Resource
 * Handles all friend-related operations
 */
export class FriendsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get complete friends summary (most efficient - everything in one call)
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Complete summary with friends, requests, blocklist, settings
   */
  async getSummary(
    accountId: string,
    fortniteToken?: string
  ): Promise<FriendsSummary> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<FriendsSummary>(
      `/friends/${accountId}/summary`,
      { headers },
      "v1"
    );
  }

  /**
   * Get friends list
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of friends with aliases and metadata
   */
  async getFriendsList(
    accountId: string,
    fortniteToken?: string
  ): Promise<Friend[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<Friend[]>(
      `/friends/${accountId}/friends`,
      { headers },
      "v1"
    );
  }

  /**
   * Get incoming friend requests
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of incoming requests
   */
  async getIncomingRequests(
    accountId: string,
    fortniteToken?: string
  ): Promise<FriendRequest[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<FriendRequest[]>(
      `/friends/${accountId}/incoming`,
      { headers },
      "v1"
    );
  }

  /**
   * Get outgoing friend requests
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of outgoing requests
   */
  async getOutgoingRequests(
    accountId: string,
    fortniteToken?: string
  ): Promise<FriendRequest[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<FriendRequest[]>(
      `/friends/${accountId}/outgoing`,
      { headers },
      "v1"
    );
  }

  /**
   * Get mutual friends between two users
   * @param accountId - Your account ID
   * @param friendId - Friend's account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of mutual friend account IDs
   */
  async getMutualFriends(
    accountId: string,
    friendId: string,
    fortniteToken?: string
  ): Promise<string[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<string[]>(
      `/friends/${accountId}/friends/${friendId}/mutual`,
      { headers },
      "v1"
    );
  }

  /**
   * Get block list
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of blocked users
   */
  async getBlocklist(
    accountId: string,
    fortniteToken?: string
  ): Promise<BlockedUser[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<BlockedUser[]>(
      `/friends/${accountId}/blocklist`,
      { headers },
      "v1"
    );
  }

  /**
   * Get friendship info for specific friend
   * @param accountId - Your account ID
   * @param friendId - Friend's account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Friendship details including mutual count
   */
  async getFriendshipInfo(
    accountId: string,
    friendId: string,
    fortniteToken?: string
  ): Promise<FriendshipInfo> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<FriendshipInfo>(
      `/friends/${accountId}/friends/${friendId}`,
      { headers },
      "v1"
    );
  }

  /**
   * Get suggested friends
   * @param accountId - Account ID
   * @param fortniteToken - Optional user Fortnite token
   * @returns Array of suggested friends
   */
  async getSuggestedFriends(
    accountId: string,
    fortniteToken?: string
  ): Promise<SuggestedFriend[]> {
    const headers: Record<string, string> = {};
    if (fortniteToken) {
      headers["x-fortnite-token"] = fortniteToken;
    }
    return this.client.request<SuggestedFriend[]>(
      `/friends/${accountId}/suggested`,
      { headers },
      "v1"
    );
  }
}
