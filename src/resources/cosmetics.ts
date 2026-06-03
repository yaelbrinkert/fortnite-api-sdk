import { FortniteAPI } from "../client";
import {
  CosmeticsResponse,
  CosmeticItem,
  CosmeticsPaginatedResponse,
  CosmeticsSearchParams,
} from "../types";

export class CosmeticsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get all cosmetics with pagination and filters
   * @param params.lang - Language code (default: en)
   */
  async getAll(params?: CosmeticsSearchParams & { lang?: string }): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.type) queryParams.set("type", params.type);
    if (params?.rarity) queryParams.set("rarity", params.rarity);
    if (params?.set) queryParams.set("set", params.set);
    if (params?.search) queryParams.set("search", params.search);
    if (params?.season) queryParams.set("season", params.season.toString());
    if (params?.chapter) queryParams.set("chapter", params.chapter.toString());
    if (params?.lang) queryParams.set("lang", params.lang);

    const query = queryParams.toString();
    const endpoint = query ? `/cosmetics/all?${query}` : "/cosmetics/all";

    return this.client.request<CosmeticsPaginatedResponse>(endpoint, {}, "v2");
  }

  /**
   * Get a specific cosmetic by ID
   * @param id - Cosmetic ID
   * @param lang - Language code (default: en)
   */
  async getById(id: string, lang?: string): Promise<CosmeticsResponse<CosmeticItem>> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<CosmeticsResponse<CosmeticItem>>(`/cosmetics/${id}${query}`, {}, "v2");
  }

  /**
   * Search cosmetics by name or description
   * @param query - Search term
   * @param params.lang - Language code (default: en)
   */
  async search(query: string, params?: Omit<CosmeticsSearchParams, 'search'> & { lang?: string }): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();
    queryParams.set("q", query);

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.type) queryParams.set("type", params.type);
    if (params?.rarity) queryParams.set("rarity", params.rarity);
    if (params?.set) queryParams.set("set", params.set);
    if (params?.lang) queryParams.set("lang", params.lang);

    return this.client.request<CosmeticsPaginatedResponse>(`/cosmetics/search?${queryParams.toString()}`, {}, "v2");
  }

  /**
   * Get recently added cosmetics
   * @param params.lang - Language code (default: en)
   */
  async getNew(params?: { page?: number; pageSize?: number; lang?: string }): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.lang) queryParams.set("lang", params.lang);

    const query = queryParams.toString();
    const endpoint = query ? `/cosmetics/new?${query}` : "/cosmetics/new";

    return this.client.request<CosmeticsPaginatedResponse>(endpoint, {}, "v2");
  }
}
