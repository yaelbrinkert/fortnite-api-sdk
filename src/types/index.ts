// Shop types
export interface Shop {
  refreshIntervalHrs: number;
  dailyPurchaseHrs: number;
  expiration: string;
  storefronts: Storefront[];
}

export interface Storefront {
  name: string;
  catalogEntries: CatalogEntry[];
}

export interface CatalogEntry {
  offerId: string;
  devName: string;
  offerType: string;
  prices: Price[];
  categories: string[];
  dailyLimit: number;
  weeklyLimit: number;
  monthlyLimit: number;
  refundable: boolean;
  appStoreId: string[];
  requirements: Requirement[];
  metaInfo: MetaInfo[];
  catalogGroup: string;
  catalogGroupPriority: number;
  sortPriority: number;
  title: string;
  shortDescription: string;
  description: string;
  displayAssetPath: string;
  itemGrants: ItemGrant[];
  giftInfo?: GiftInfo;
}

export interface Price {
  currencyType: string;
  currencySubType: string;
  regularPrice: number;
  dynamicRegularPrice: number;
  finalPrice: number;
  saleExpiration: string;
  basePrice: number;
  saleType?: string;
}

export interface Requirement {
  requirementType: string;
  requiredId: string;
  minQuantity: number;
}

export interface MetaInfo {
  key: string;
  value: string;
}

export interface ItemGrant {
  templateId: string;
  quantity: number;
  attributes: Record<string, any>;
}

export interface GiftInfo {
  bIsEnabled: boolean;
  forcedGiftBoxTemplateId: string;
  purchaseRequirements: any[];
}

export interface TournamentsBundle {}

export interface ShopItem {
  id: string;
  name: string;
  type: string;
  rarity: string;
  images: {
    icon: string;
    featured?: string;
  };
}

// Tournament types
export interface Tournament {
  eventId: string;
  eventName: string;
  beginTime: string;
  endTime: string;
  regions: string[];
}

export interface Leaderboard {
  gameId: string;
  eventId: string;
  eventWindowId: string;
  page: number;
  totalPages: number;
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  teamAccountIds: string[];
  teamAccountDisplayNames: string[];
  pointsEarned: number;
  rank: number;
  sessionHistory: any[];
}

// Profile types
export interface Profile {
  id: string;
  displayName: string;
  email?: string;
  country?: string;
}

export interface ProfileStats {
  accountId: string;
  stats: Record<string, number>;
}

// Calendar types
export interface SeasonInfo {
  seasonDateBegin: string;
  seasonDateEnd: string;
  seasonNumber: number;
  exTime: number;
}

// Oauth types
// Response types
export interface OAuthFlowResponse {
  success: boolean;
  flowId: string;
  verificationUri: string;
  expiresIn: number;
}

export interface OAuthCompleteResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  accountId: string;
  displayName: string;
  deviceAuth: {
    accountId: string;
    deviceId: string;
    secret: string;
  };
}

export interface OAuthRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  accountId: string;
  tokenChanged: boolean;
}

export interface OAuthDeviceRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  accountId: string;
  displayName: string;
}

// Parsing Types
export interface ParsedReplayData {
  // Replays cannot be predicted
  [key: string]: any;
}

export interface ParsingResponse {
  success: boolean;
  data?: ParsedReplayData;
  error?: string;
}

export interface BatchParsingResponse {
  success: boolean;
  results?: ParsedReplayData[];
  error?: string;
}

// Tournament Tracker types
export interface TournamentTrackerEntry {
  eventWindowId: string;
  eventName: string;
  eventId: string;
  beginTime: string;
  endTime: string;
  region: string;
}

export interface TournamentTrackerResponse {
  tournaments_played: TournamentTrackerEntry[];
  total_count: number;
}

export interface TournamentEligibilityResponse {
  eligible: boolean;
  tournaments_played: number;
  tournaments_required: number;
  tournaments_remaining: number;
  calculation_period_days: number;
  oldest_tournament_date: string | null;
  newest_tournament_date: string | null;
  recent_tournaments: TournamentTrackerEntry[];
}

// Weapons
export interface Weapons {
  key: WeaponsInfos;
}

export interface WeaponsInfos {
  id: string;
  displayName: string;
  description: string;
  rarity: string;
  gameplayTags: GameplayTags;
  icon: string;
  type: string;
  category: string | null;
  season: number;
  series: string;
  stats: WeaponsStats;
}

export interface GameplayTags {
  gameplayTags: Array<String>;
}

export interface WeaponsStats {
  firingRate: number;
  dynamicFiringRate: number;
  burstFiringRate: number;
  criticalDamageMultiplier: number;
  vulnerabilityDamageMultiplier: number;
  diceCritChance: number;
  diceCritDamageMultiplier: number;
  reloadTime: number;
  damagePerBullet: number;
  environmentDamagePerBullet: number;
  clipSize: number;
  ammoCostPerFire: number;
  bulletsPerCartridge: number;
  cartridgePerFire: number;
  overheatedCooldownDelay: number;
  maxDamagePerCartridge: number;
}

export interface BattlePass {
  battlePassContent: BattlePassContent;
  battlePassOffers: Array<BattlePassOffers>;
}

export interface MessagesBP {
  layout: string;
  image: string;
  hidden?: boolean;
  _type: string;
  title: string;
  body: string;
  spotlight: boolean;
}

export interface BattlePassContent {
  news: {
    _type: string;
    messages: Array<MessagesBP>;
  };
  _title: string;
  _noIndex: boolean;
  _activeDate: string;
  lastModified: string;
  _locale: string;
  _templateName: string;
  _suggestedPrefetch: Array<any>;
}

export interface PricesBP {
  currencyType: string;
  currencySubType: string;
  regularPrice: number;
  dynamicRegularPrice: number;
  finalPrice: number;
  saleExpiration: string;
  basePrice: number;
}

export interface RequirementsBP {
  requirementType: string;
  requiredId: string;
  minQuantity: number;
}

export interface MetaInfoBP {
  key: string;
  value: string;
}

export interface BattlePassOffers {
  offerId: string;
  devName: string;
  offerType: string;
  prices: Array<PricesBP>;
  categories: Array<any>;
  dailyLimit: number;
  weeklyLimit: number;
  monthlyLimit: number;
  refundable: boolean;
  appStoreId: Array<string>;
  requirements: Array<RequirementsBP>;
  metaInfo: Array<MetaInfoBP>;
  catalogGroup: string;
  catalogGroupPriority: number;
  sortPriority: number;
  title: string;
  shortDescription: string;
  description: string;
  displayAssetPath: string;
  itemGrants: Array<any>;
  sectionId: string | null;
  sectionDisplayName: string | null;
  sectionPriority: number | null;
  sectionBackground: null | null;
  offerVisual: string | null;
  tileSize: string;
}

// Quests types
export interface QuestsResponse {
  // The quests API returns dynamic data from Epic Games
  // Structure may vary based on season and available quests
  [key: string]: any;
}

// Account Service types
export interface Account {
  id: string;
  displayName: string;
  externalAuths?: Record<string, ExternalAuth>;
}

export interface ExternalAuth {
  accountId: string;
  type: string;
  externalAuthId?: string;
  externalDisplayName?: string;
  authIds?: Array<{
    id: string;
    type: string;
  }>;
}

export interface BulkExternalDisplayNameRequest {
  lookups: Array<{
    externalAuthType: string;
    displayName: string;
  }>;
}

export interface BulkExternalIdRequest {
  lookups: Array<{
    externalAuthType: string;
    externalId: string;
  }>;
}

// FN Service types
export interface BRInventory {
  stash?: {
    globalcash?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Keychain {
  keychain?: Array<{
    key: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface Receipt {
  receiptId: string;
  purchaseDate: string;
  offerId: string;
  [key: string]: any;
}

export interface EnabledFeatures {
  [key: string]: any;
}

export interface VersionCheck {
  type: string;
  [key: string]: any;
}

export interface PrivacySettings {
  accountId?: string;
  optOutOfPublicLeaderboards?: boolean;
  [key: string]: any;
}

export interface EntitlementCheck {
  entitlement?: boolean;
  [key: string]: any;
}

// Friends Service types
export interface FriendsSummary {
  friends?: Friend[];
  incoming?: FriendRequest[];
  outgoing?: FriendRequest[];
  blocklist?: BlockedUser[];
  settings?: {
    [key: string]: any;
  };
}

export interface Friend {
  accountId: string;
  displayName?: string;
  status: "ACCEPTED" | "PENDING";
  direction: "INBOUND" | "OUTBOUND";
  created: string;
  favorite?: boolean;
  mutual?: number;
}

export interface FriendRequest {
  accountId: string;
  displayName?: string;
  status: string;
  direction: string;
  created: string;
}

export interface BlockedUser {
  accountId: string;
  displayName?: string;
}

export interface FriendshipInfo extends Friend {
  mutual: number;
}

export interface SuggestedFriend {
  accountId: string;
  displayName?: string;
  mutualFriends?: number;
}

// Stats Service types
export interface PlayerStats {
  accountId: string;
  stats: {
    [key: string]: any;
  };
}

export interface BulkStatsRequest {
  accountIds: string[];
  stats?: string[];
}

export interface BulkStatsResponse {
  accountId: string;
  stats: {
    [key: string]: any;
  };
}

export interface LeaderboardOptions {
  limit?: number;
  offset?: number;
  window?: "alltime" | "season" | "weekly" | "daily";
}

export interface LeaderboardResponse {
  stat: string;
  window: string;
  entries: Array<{
    rank: number;
    accountId: string;
    displayName?: string;
    value: number;
  }>;
  pagination?: {
    limit: number;
    offset: number;
    total?: number;
  };
}

// Events Service types
export interface EventWindows {
  eventId: string;
  displayName?: string;
  windows: Array<{
    eventWindowId: string;
    beginTime: string;
    endTime: string;
    round?: number;
  }>;
}

export interface PlayerEventHistory {
  eventId: string;
  eventWindowId: string;
  eventName?: string;
  beginTime: string;
  endTime: string;
  region?: string;
}

export interface TournamentDetails {
  eventId: string;
  eventWindowId: string;
  beginTime: string;
  endTime: string;
  round?: number;
  payoutDelay?: number;
  [key: string]: any;
}

export interface ScoringRules {
  scoring: Array<{
    eventName: string;
    points: number;
  }>;
}

export interface EventLeaderboard {
  entries: Array<{
    rank: number;
    accountId: string;
    teamId?: string;
    pointsEarned: number;
    score: number;
    [key: string]: any;
  }>;
}

export interface PlayerEventData {
  accountId: string;
  teamId?: string;
  pointsEarned: number;
  rank?: number;
  percentile?: number;
  sessions?: Array<any>;
}

export interface EligibilityStatus {
  eligible: boolean;
  reasons?: string[];
}

export interface ArenaHype {
  accountId: string;
  currentHype?: number;
  division?: string;
  divisionNumber?: number;
  progress?: number;
}

export interface EventRewards {
  prizes: Array<{
    placement: string;
    amount: number;
    currency?: string;
  }>;
}

// News types
export interface NewsResponse<T> {
  status: number;
  data: T;
}

export interface MOTD {
  id: string;
  title: string;
  body: string;
  image: string;
  tileImage?: string;
  videoURL?: string;
  [key: string]: any;
}

export interface BRNews {
  motds: MOTD[];
  platform_motds?: MOTD[];
  [key: string]: any;
}

export interface STWNews {
  motds: MOTD[];
  [key: string]: any;
}

export interface CreativeNews {
  motds: MOTD[];
  [key: string]: any;
}

export interface AllNews {
  br: BRNews;
  stw: STWNews;
  creative: CreativeNews;
  lastModified: string;
}

// Cosmetics types
export interface CosmeticsResponse<T> {
  status: number;
  data: T;
}

export interface CosmeticsPaginatedResponse {
  status: number;
  data: CosmeticItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface CosmeticItem {
  id: string;
  name: string;
  description?: string;
  type: string;
  rarity: string;
  series?: string;
  set?: string;
  images?: {
    icon?: string;
    featured?: string;
    [key: string]: any;
  };
  introduction?: {
    season?: number;
    chapter?: number;
  };
  [key: string]: any;
}

export interface CosmeticsSearchParams {
  page?: number;
  pageSize?: number;
  type?: string;
  rarity?: string;
  set?: string;
  search?: string;
}

// Crew types
export interface CrewPackResponse {
  status: number;
  data: {
    crew: {
      name: string;
      catalogEntries: any[];
      refreshIntervalHrs: number;
      dailyPurchaseHrs: number;
    } | null;
    count: number;
    message: string;
    lastModified: string;
  };
}

export interface CrewHistoryResponse {
  status: number;
  data: {
    history: any[];
    count: number;
    message: string;
    lastModified: string;
  };
}

// Map types
export interface MapResponse {
  status: number;
  data: {
    [key: string]: any;
  };
}

export interface MapImageResponse {
  status: number;
  data: {
    [key: string]: any;
  };
}

export interface MapHistoryResponse {
  status: number;
  data: {
    [key: string]: any;
  };
}

// Playlists types
export interface PlaylistsResponse {
  status: number;
  data: {
    playlists: {
      [playlistId: string]: Playlist;
    };
    conversion_config: any;
    lastModified: string;
  };
}

export interface ActivePlaylistsResponse {
  status: number;
  data: {
    playlists: {
      [playlistId: string]: Playlist;
    };
    count: number;
    lastModified: string;
  };
}

export interface PlaylistResponse {
  status: number;
  data: Playlist;
}

export interface Playlist {
  id: string;
  image: string;
  playlist_name: string;
  hidden: boolean;
  _type: string;
  lastModified?: string;
  [key: string]: any;
}
