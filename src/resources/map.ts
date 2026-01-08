import { FortniteAPI } from "../client";
import { MapResponse, MapImageResponse, MapHistoryResponse } from "../types";

export class MapResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get current Fortnite map with POIs
   */
  async getCurrent(): Promise<MapResponse> {
    return this.client.request<MapResponse>("/map");
  }

  /**
   * Get current map image URL
   */
  async getImage(): Promise<MapImageResponse> {
    return this.client.request<MapImageResponse>("/map/image");
  }

  /**
   * Get historical map data
   */
  async getHistory(): Promise<MapHistoryResponse> {
    return this.client.request<MapHistoryResponse>("/map/history");
  }
}
