// Shop types
export interface Shop {
  date: string;
  bundles: ShopBundle[];
}

export interface ShopBundle {
  id: string;
  name: string;
  price: number;
  items: ShopItem[];
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
