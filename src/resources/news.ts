import { FortniteAPI } from "../client";
import { NewsResponse, BRNews, STWNews, CreativeNews, AllNews } from "../types";

export class NewsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get Battle Royale news
   * @param lang - Language code (default: en)
   */
  async getBRNews(lang?: string): Promise<NewsResponse<BRNews>> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<NewsResponse<BRNews>>(`/news/br${query}`);
  }

  /**
   * Get Save The World news
   * @param lang - Language code (default: en)
   */
  async getSTWNews(lang?: string): Promise<NewsResponse<STWNews>> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<NewsResponse<STWNews>>(`/news/stw${query}`);
  }

  /**
   * Get Creative news
   * @param lang - Language code (default: en)
   */
  async getCreativeNews(lang?: string): Promise<NewsResponse<CreativeNews>> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<NewsResponse<CreativeNews>>(`/news/creative${query}`);
  }

  /**
   * Get all news (BR, STW, Creative)
   * @param lang - Language code (default: en)
   */
  async getAllNews(lang?: string): Promise<NewsResponse<AllNews>> {
    const query = lang ? `?lang=${encodeURIComponent(lang)}` : "";
    return this.client.request<NewsResponse<AllNews>>(`/news${query}`);
  }
}
