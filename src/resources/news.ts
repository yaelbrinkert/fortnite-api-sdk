import { FortniteAPI } from "../client";
import { NewsResponse, BRNews, STWNews, CreativeNews, AllNews } from "../types";

export class NewsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get Battle Royale news
   */
  async getBRNews(): Promise<NewsResponse<BRNews>> {
    return this.client.request<NewsResponse<BRNews>>("/news/br");
  }

  /**
   * Get Save The World news
   */
  async getSTWNews(): Promise<NewsResponse<STWNews>> {
    return this.client.request<NewsResponse<STWNews>>("/news/stw");
  }

  /**
   * Get Creative news
   */
  async getCreativeNews(): Promise<NewsResponse<CreativeNews>> {
    return this.client.request<NewsResponse<CreativeNews>>("/news/creative");
  }

  /**
   * Get all news (BR, STW, Creative)
   */
  async getAllNews(): Promise<NewsResponse<AllNews>> {
    return this.client.request<NewsResponse<AllNews>>("/news");
  }
}
