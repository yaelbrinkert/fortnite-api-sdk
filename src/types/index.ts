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
