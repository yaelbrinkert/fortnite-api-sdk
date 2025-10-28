import { ShopResource } from "./resources/shop";
import { TournamentsResource } from "./resources/tournaments";
import { ProfilesResource } from "./resources/profiles";
import { CalendarResource } from "./resources/calendar";
import { FortniteAPIError } from "./errors";
import { BundlesResource } from "./resources/bundles";
import { OauthResource } from "./resources/oauth";

export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class FortniteAPI {
  private apiKey: string;
  private baseUrl: string;

  // Resources
  public shop: ShopResource;
  public tournaments: TournamentsResource;
  public profiles: ProfilesResource;
  public calendar: CalendarResource;
  public bundles: BundlesResource;
  public oauth: OauthResource;

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || "https://prod.api-fortnite.com/api/v1";
    // this.baseUrl = options.baseUrl || "http://localhost:4321/api/v1";

    // Initialize resources
    this.shop = new ShopResource(this);
    this.tournaments = new TournamentsResource(this);
    this.profiles = new ProfilesResource(this);
    this.calendar = new CalendarResource(this);
    this.bundles = new BundlesResource(this);
    this.oauth = new OauthResource(this);
  }

  /**
   * Internal method to make HTTP requests
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "x-api-key": this.apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: "Request failed" };
      }

      throw new FortniteAPIError(
        errorData.error || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  }
}
