import { ShopResource } from "./resources/shop";
import { TournamentsResource } from "./resources/tournaments";
import { ProfilesResource } from "./resources/profiles";
import { CalendarResource } from "./resources/calendar";
import { FortniteAPIError } from "./errors";
import { BundlesResource } from "./resources/bundles";
import { OauthResource } from "./resources/oauth";
import { ParsingResource } from "./resources/parsing";
import { WeaponsResource } from "./resources/weapons";
import { BattlePassResource } from "./resources/battlepass";
import { QuestsResource } from "./resources/quests";
import { AccountResource } from "./resources/account";
import { FNResource } from "./resources/fn";
import { FriendsResource } from "./resources/friends";
import { StatsResource } from "./resources/stats";
import { EventsResource } from "./resources/events";
import { NewsResource } from "./resources/news";
import { CosmeticsResource } from "./resources/cosmetics";
import { CrewResource } from "./resources/crew";
import { MapResource } from "./resources/map";
import { PlaylistsResource } from "./resources/playlists";

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
  public parsing: ParsingResource;
  public weapons: WeaponsResource;
  public battlepass: BattlePassResource;
  public quests: QuestsResource;
  public account: AccountResource;
  public fn: FNResource;
  public friends: FriendsResource;
  public stats: StatsResource;
  public events: EventsResource;
  public news: NewsResource;
  public cosmetics: CosmeticsResource;
  public crew: CrewResource;
  public map: MapResource;
  public playlists: PlaylistsResource;

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || "https://prod.api-fortnite.com/api";
    // this.baseUrl = options.baseUrl || "http://localhost:4321/api/v1";

    // Initialize resources
    this.shop = new ShopResource(this);
    this.tournaments = new TournamentsResource(this);
    this.profiles = new ProfilesResource(this);
    this.calendar = new CalendarResource(this);
    this.bundles = new BundlesResource(this);
    this.oauth = new OauthResource(this);
    this.parsing = new ParsingResource(this);
    this.weapons = new WeaponsResource(this);
    this.battlepass = new BattlePassResource(this);
    this.quests = new QuestsResource(this);
    this.account = new AccountResource(this);
    this.fn = new FNResource(this);
    this.friends = new FriendsResource(this);
    this.stats = new StatsResource(this);
    this.events = new EventsResource(this);
    this.news = new NewsResource(this);
    this.cosmetics = new CosmeticsResource(this);
    this.crew = new CrewResource(this);
    this.map = new MapResource(this);
    this.playlists = new PlaylistsResource(this);
  }

  /**
   * Internal method to make HTTP requests
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    version: "v1" | "v2" | "v3" = "v1"
  ): Promise<T> {
    const url = `${this.baseUrl}/${version}${endpoint}`;

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

  /**
   * Internal method for multipart/form-data requests (file uploads)
   */
  async requestMultipart<T>(
    endpoint: string,
    formData: FormData,
    version: "v1" | "v2" | "v3" = "v1"
  ): Promise<T> {
    const url = `${this.baseUrl}/${version}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        // Don't set Content-Type - browser/node will set it with boundary
      },
      body: formData,
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
