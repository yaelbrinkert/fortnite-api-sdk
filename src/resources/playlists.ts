import { FortniteAPI } from "../client";
import { PlaylistsResponse, ActivePlaylistsResponse, PlaylistResponse } from "../types";

export class PlaylistsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get all Fortnite playlists/gamemodes
   * @param lang - Language code (default: en)
   */
  async getAll(lang?: string): Promise<PlaylistsResponse> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<PlaylistsResponse>(`/playlists${query}`, {}, "v2");
  }

  /**
   * Get currently active playlists/gamemodes
   * @param lang - Language code (default: en)
   */
  async getActive(lang?: string): Promise<ActivePlaylistsResponse> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<ActivePlaylistsResponse>(`/playlists/active${query}`, {}, "v2");
  }

  /**
   * Get a specific playlist by ID
   * @param playlistId - Playlist identifier
   * @param lang - Language code (default: en)
   */
  async getById(playlistId: string, lang?: string): Promise<PlaylistResponse> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<PlaylistResponse>(`/playlists/${playlistId}${query}`, {}, "v2");
  }
}
