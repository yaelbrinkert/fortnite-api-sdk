import { FortniteAPI } from "../client";
import { PlaylistsResponse, ActivePlaylistsResponse, PlaylistResponse } from "../types";

export class PlaylistsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get all Fortnite playlists/gamemodes
   */
  async getAll(): Promise<PlaylistsResponse> {
    return this.client.request<PlaylistsResponse>("/playlists", {}, "v2");
  }

  /**
   * Get currently active playlists/gamemodes
   */
  async getActive(): Promise<ActivePlaylistsResponse> {
    return this.client.request<ActivePlaylistsResponse>("/playlists/active", {}, "v2");
  }

  /**
   * Get a specific playlist by ID
   */
  async getById(playlistId: string): Promise<PlaylistResponse> {
    return this.client.request<PlaylistResponse>(`/playlists/${playlistId}`, {}, "v2");
  }
}
