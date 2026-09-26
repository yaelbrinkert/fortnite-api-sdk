import { FortniteAPI } from "../client";
import { NewsFeed, NewsNotice, NewsPlatform, AllNews } from "../types";

/**
 * The in-game lobby news carousel, fetched live from Epic as a generic account (no Battle
 * Pass, US / NA-East) and cached 10 minutes. Epic personalises the carousel per player, so a
 * real account may see a slightly different set. Pro and Custom plans.
 */
export class NewsResource {
  constructor(private client: FortniteAPI) {}

  private query(lang?: string, platform?: NewsPlatform | string): string {
    const params = new URLSearchParams();
    if (lang) params.set("lang", lang);
    if (platform) params.set("platform", platform);
    const q = params.toString();
    return q ? `?${q}` : "";
  }

  /**
   * Battle Royale lobby news
   * @param lang - Language code (default: en)
   * @param platform - Platform (default: Windows); Epic varies some entries by platform
   */
  async getBRNews(lang?: string, platform?: NewsPlatform | string): Promise<NewsFeed> {
    return this.client.request<NewsFeed>(`/news/br${this.query(lang, platform)}`);
  }

  /**
   * Lobby news Epic serves for Save the World. As of September 2026 Epic runs no separate
   * rotation for it: this is Epic's general lobby rotation (same entries as getCreativeNews).
   */
  async getSTWNews(lang?: string, platform?: NewsPlatform | string): Promise<NewsFeed> {
    return this.client.request<NewsFeed>(`/news/stw${this.query(lang, platform)}`);
  }

  /**
   * Lobby news Epic serves for Creative. As of September 2026 Epic runs no separate rotation
   * for it: this is Epic's general lobby rotation (same entries as getSTWNews).
   */
  async getCreativeNews(lang?: string, platform?: NewsPlatform | string): Promise<NewsFeed> {
    return this.client.request<NewsFeed>(`/news/creative${this.query(lang, platform)}`);
  }

  /** Fortnite Festival lobby news. */
  async getFestivalNews(lang?: string, platform?: NewsPlatform | string): Promise<NewsFeed> {
    return this.client.request<NewsFeed>(`/news/festival${this.query(lang, platform)}`);
  }

  /** Current emergency notices (in-game warning banners). Empty when Epic has none up. */
  async getNotices(lang?: string): Promise<NewsNotice[]> {
    return this.client.request<NewsNotice[]>(`/news/notices${this.query(lang)}`);
  }

  /** Every mode's lobby news plus the emergency notices, in one call. */
  async getAllNews(lang?: string, platform?: NewsPlatform | string): Promise<AllNews> {
    return this.client.request<AllNews>(`/news${this.query(lang, platform)}`);
  }
}
