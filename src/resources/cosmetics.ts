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
   */
  async getAll(params?: CosmeticsSearchParams): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.type) queryParams.set("type", params.type);
    if (params?.rarity) queryParams.set("rarity", params.rarity);
    if (params?.set) queryParams.set("set", params.set);
    if (params?.search) queryParams.set("search", params.search);

    const query = queryParams.toString();
    const endpoint = query ? `/cosmetics/all?${query}` : "/cosmetics/all";

    return this.client.request<CosmeticsPaginatedResponse>(endpoint);
  }

  /**
   * Get a specific cosmetic by ID
   */
  async getById(id: string): Promise<CosmeticsResponse<CosmeticItem>> {
    return this.client.request<CosmeticsResponse<CosmeticItem>>(`/cosmetics/${id}`);
  }

  /**
   * Search cosmetics by name or description
   */
  async search(query: string, params?: Omit<CosmeticsSearchParams, 'search'>): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();
    queryParams.set("q", query);

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params?.type) queryParams.set("type", params.type);
    if (params?.rarity) queryParams.set("rarity", params.rarity);
    if (params?.set) queryParams.set("set", params.set);

    return this.client.request<CosmeticsPaginatedResponse>(`/cosmetics/search?${queryParams.toString()}`);
  }

  /**
   * Get recently added cosmetics
   */
  async getNew(params?: { page?: number; pageSize?: number }): Promise<CosmeticsPaginatedResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());

    const query = queryParams.toString();
    const endpoint = query ? `/cosmetics/new?${query}` : "/cosmetics/new";

    return this.client.request<CosmeticsPaginatedResponse>(endpoint);
  }
}
