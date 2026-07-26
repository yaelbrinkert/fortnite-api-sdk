import { FortniteAPI } from "../client";
import { MapResponse, MapImageResponse, MapHistoryResponse } from "../types";

export class MapResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get a Fortnite map with its POIs and minimap metadata.
   * @param version - Map version (patch number); defaults to the current version.
   * @param mode - Which map to return: `br` (default), `og`, or `rotating:<codename>`.
   *   The available values are listed in the response's `data.modes`.
   * @param lang - Language code for POI labels (default: `en`).
   *
   * @example
   * const br = await client.map.getCurrent();
   * const og = await client.map.getCurrent(undefined, "og");
   * const reload = await client.map.getCurrent(undefined, "rotating:blastberry");
   * const old = await client.map.getCurrent("33.00");
   */
  async getCurrent(version?: string, mode?: string, lang?: string): Promise<MapResponse> {
    const params = new URLSearchParams();
    if (version) params.set("version", version);
    if (mode) params.set("mode", mode);
    if (lang) params.set("lang", lang);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.client.request<MapResponse>(`/map${query}`);
  }

  /**
   * Get the map image (302 redirect to the raw image).
   * Prefer reading `getCurrent().data.imageUrl`, which is the direct URL.
   * @param version - Map version; defaults to current.
   * @param mode - Which image: `br` (default), `og`, or `rotating:<codename>`.
   */
  async getImage(version?: string, mode?: string): Promise<MapImageResponse> {
    const params = new URLSearchParams();
    if (version) params.set("version", version);
    if (mode) params.set("mode", mode);
    const query = params.toString() ? `?${params.toString()}` : "";
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
