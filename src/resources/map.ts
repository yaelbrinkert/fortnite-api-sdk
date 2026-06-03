import { FortniteAPI } from "../client";
import { MapResponse, MapImageResponse, MapHistoryResponse } from "../types";

export class MapResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current Fortnite map with POIs
   * @param version - Optional map version (patch number); defaults to current
   * @param lang - Language code for POI labels (default: en)
   */
  async getCurrent(version?: string, lang?: string): Promise<MapResponse> {
    const params = new URLSearchParams();
    if (version) params.set("version", version);
    if (lang) params.set("lang", lang);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<MapResponse>(`/map${query}`);
  }

  /**
   * Get current map image URL
   * @param version - Optional specific map version to retrieve
   */
  async getImage(version?: string): Promise<MapImageResponse> {
    const query = version ? `?version=${encodeURIComponent(version)}` : "";
    return this.client.request<MapImageResponse>(`/map/image${query}`);
  }

  /**
   * Get historical map data
   * @param options.chapter - Filter by chapter number
   * @param options.season - Filter by season number
   */
  async getHistory(options?: { chapter?: number; season?: number }): Promise<MapHistoryResponse> {
    const params = new URLSearchParams();
    if (options?.chapter) params.set("chapter", options.chapter.toString());
    if (options?.season) params.set("season", options.season.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<MapHistoryResponse>(`/map/history${query}`);
  }
}
