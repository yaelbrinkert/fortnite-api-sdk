# Fortnite API SDK

Official JavaScript/TypeScript SDK for the Fortnite API by Royal Arena.

## Installation

```bash
npm install @yaelouuu/fortnite-api
```

## API Key

Acquire your API Key by creating a Free Account here: https://api-fortnite.com

## Quick Start

```typescript
import { FortniteAPI } from "@yaelouuu/fortnite-api";

const client = new FortniteAPI({
  apiKey: "your-api-key-here",
});

// Get current shop
const shop = await client.shop.getCurrent();

// Get tournament leaderboard
const leaderboard = await client.tournaments.getLeaderboard({
  eventId: "epicgames_S37_BlitzCupsAllPlatforms_BR",
  eventWindowId: "S37_BlitzCupsAllPlatforms_Event1_BR",
  page: 0,
});
```

## Features

- ✅ Full TypeScript support with comprehensive type definitions
- ✅ Promise-based async/await API
- ✅ Automatic error handling with detailed error messages
- ✅ Support for all Fortnite API endpoints
- ✅ Built-in OAuth flow helpers
- ✅ Tree-shakeable for optimal bundle size

---

## 📚 API Resources

### Shop

Access the Fortnite Item Shop and Battle Pass data.

```typescript
// Get current item shop
const shop = await client.shop.getCurrent();

// Get current Battle Pass
const battlePass = await client.battlepass.getBattlePass();
```

---

### Tournaments

Comprehensive tournament data including leaderboards, events, and eligibility tracking.

#### Get Current Events
```typescript
const events = await client.tournaments.getCurrent();
```

#### Get Tournament Leaderboard (V1)
```typescript
const leaderboard = await client.tournaments.getLeaderboard({
  eventId: "epicgames_S37_BlitzCupsAllPlatforms_BR",
  eventWindowId: "S37_BlitzCupsAllPlatforms_Event1_BR",
  page: 0,
});
```

#### Get Tournament Leaderboard (V2) - **NEW**
Enhanced leaderboard endpoint with POST body for bulk team queries:

```typescript
// Solo tournament - query multiple players
const leaderboard = await client.tournaments.getLeaderboardV2(
  {
    eventId: "epicgames_S37_BlitzCupsAllPlatforms_BR",
    eventWindowId: "S37_BlitzCupsAllPlatforms_Event1_BR",
  },
  [
    ["accountId1"],
    ["accountId2"],
    ["accountId3"],
  ]
);

// Duo tournament
const duoLeaderboard = await client.tournaments.getLeaderboardV2(
  {
    eventId: "epicgames_S37_DuoCup_BR",
    eventWindowId: "S37_DuoCup_Event1_BR",
  },
  [
    ["player1Id", "player2Id"],
    ["player3Id", "player4Id"],
  ]
);
```

#### Tournament Tracker
Track player participation history:

```typescript
const tracker = await client.tournaments.getTracker(
  "accountId",
  "fortniteToken"
);
// Returns: All tournaments the player has participated in
```

#### Check Tournament Eligibility
Verify if a player meets requirements for major tournaments (e.g., 14 tournaments in 180 days):

```typescript
const eligibility = await client.tournaments.checkEligibility(
  "accountId",
  "fortniteToken",
  {
    days: 180,
    requiredTournaments: 14,
  }
);

console.log(eligibility.eligible); // true/false
console.log(eligibility.tournaments_remaining); // How many more needed
```

#### Download Events
Get personalized event data:

```typescript
const events = await client.tournaments.download(
  {
    accountId: "your-account-id",
    region: "EU",
    platform: "Windows",
  },
  "fortniteToken"
);
```

---

### Quests - **NEW**

Access player quest progress, XP, and account level information.

```typescript
// Get quest data for an account
const quests = await client.quests.getQuests(
  "accountId",
  "fortniteToken"
);

// Returns comprehensive data:
// - Active quest progress
// - Account XP and level
// - Playtime statistics
// - Quest rewards
```

**Authentication Required**: User's personal Fortnite OAuth token

---

### Profiles

Player profile information and statistics.

```typescript
// Get profile by display name
const profile = await client.profiles.getByName("PlayerName");

// Get profile statistics
const stats = await client.profiles.getStats("accountId");
```

---

### Calendar

Fortnite in-game calendar and season information.

```typescript
// Get current season info
const season = await client.calendar.getCurrentSeason();

// Returns: Season number, start/end dates, and more
```

---

### Bundles

Fortnite game asset bundles and cosmetics.

```typescript
// Get all available bundles
const bundles = await client.bundles.getAll();
```

---

### Weapons

Comprehensive weapon data including stats and metadata.

```typescript
// Get all weapons
const weapons = await client.weapons.getAll();

// Includes: Damage, fire rate, reload time, rarity, and more
```

---

### OAuth

OAuth authentication flow helpers for obtaining user tokens.

```typescript
// Start OAuth flow
const flow = await client.oauth.startFlow();
console.log(flow.verificationUri); // Show this URL to the user

// Complete OAuth flow
const authData = await client.oauth.completeFlow(flow.flowId);
console.log(authData.accessToken); // User's Fortnite token
console.log(authData.deviceAuth); // Device auth credentials

// Refresh token
const refreshed = await client.oauth.refreshToken(authData.refreshToken);
```

---

### Parsing

Parse Fortnite replay files to extract match data.

```typescript
// Parse a single replay file
const replayData = await client.parsing.parseReplay(fileBuffer);

// Parse multiple replays
const batchResults = await client.parsing.parseBatch([file1, file2, file3]);
```

---

### Account - **NEW**

Comprehensive account lookup and management with cross-platform support.

#### Lookup by Account ID
```typescript
const account = await client.account.getById('accountId123');
// Returns: { id, displayName, externalAuths }
```

#### Lookup by Display Name
```typescript
const account = await client.account.getByDisplayName('Ninja');
// Returns: Epic account information
```

#### Cross-Platform Lookup
Search for accounts by platform usernames (PSN, Xbox, Steam, Nintendo, Twitch, GitHub):

```typescript
// Find by PSN username
const account = await client.account.getByExternalDisplayName(
  'psn',
  'PSN_Username',
  true  // case insensitive
);

// Find by Xbox gamertag
const xboxAccount = await client.account.getByExternalDisplayName(
  'xbl',
  'Xbox_Gamertag',
  false  // case sensitive
);
```

**Supported Platforms:**
- `psn` - PlayStation Network
- `xbl` - Xbox Live
- `steam` - Steam
- `nintendo` - Nintendo Switch
- `twitch` - Twitch
- `github` - GitHub

#### Bulk Operations
Process multiple accounts efficiently:

```typescript
// Bulk account lookup (max 100)
const accounts = await client.account.getBulk([
  'accountId1',
  'accountId2',
  'accountId3'
]);

// Bulk external display name lookup
const accounts = await client.account.getBulkExternalDisplayNames({
  lookups: [
    { externalAuthType: 'psn', displayName: 'PSNUser1' },
    { externalAuthType: 'xbl', displayName: 'XboxUser1' },
    { externalAuthType: 'steam', displayName: 'SteamUser1' }
  ]
});

// Bulk external ID lookup
const accounts = await client.account.getBulkExternalIds({
  lookups: [
    { externalAuthType: 'psn', externalId: 'psn-id-123' },
    { externalAuthType: 'xbl', externalId: 'xbl-id-456' }
  ]
});
```

#### External Authentications
Get platform connection information:

```typescript
// List all linked platforms
const auths = await client.account.getExternalAuths('accountId123');
// Returns: Array of all connected platforms

// Get specific platform connection
const psnAuth = await client.account.getExternalAuth('accountId123', 'psn');
// Returns: PSN-specific connection details
```

---

### News - **NEW**

Get Fortnite news and announcements for all game modes.

```typescript
// Get Battle Royale news
const brNews = await client.news.getBRNews();
// Returns: MOTDs, platform messages, images, and videos

// Get Save The World news
const stwNews = await client.news.getSTWNews();

// Get Creative news
const creativeNews = await client.news.getCreativeNews();

// Get all news at once
const allNews = await client.news.getAllNews();
// Returns: { br, stw, creative, lastModified }
```

---

### Cosmetics - **NEW**

Browse and search the complete Fortnite cosmetics catalog.

#### Get All Cosmetics
```typescript
const cosmetics = await client.cosmetics.getAll({
  page: 1,
  pageSize: 50,
  type: 'outfit',  // outfit, backpack, pickaxe, glider, emote, wrap, music, etc.
  rarity: 'legendary',  // common, uncommon, rare, epic, legendary, mythic
  set: 'Dark Series'
});
// Returns: Paginated list with item details
```

#### Get Cosmetic by ID
```typescript
const item = await client.cosmetics.getById('CID_123_Athena');
// Returns: Detailed cosmetic information
```

#### Search Cosmetics
```typescript
const results = await client.cosmetics.search('galaxy', {
  page: 1,
  pageSize: 20,
  type: 'outfit'
});
// Search by name or description
```

#### Get New Cosmetics
```typescript
const newItems = await client.cosmetics.getNew({
  page: 1,
  pageSize: 50
});
// Returns: Recently added cosmetics
```

---

### Crew - **NEW**

Fortnite Crew subscription pack information.

```typescript
// Get current month's Crew Pack
const current = await client.crew.getCurrent();
// Returns: Current crew pack with cosmetics and details

// Get Crew Pack history
const history = await client.crew.getHistory();
// Returns: All previous crew packs
```

---

### Map - **NEW**

Current and historical Fortnite map data.

```typescript
// Get current map with POIs
const map = await client.map.getCurrent();
// Returns: Map data with points of interest

// Get map image URL
const mapImage = await client.map.getImage();
// Returns: Current map image URL

// Get historical map data
const history = await client.map.getHistory();
// Returns: Previous map versions
```

---

### Playlists - **NEW**

Fortnite playlists and game modes.

```typescript
// Get all playlists
const allPlaylists = await client.playlists.getAll();
// Returns: All game modes and playlists

// Get active playlists only
const active = await client.playlists.getActive();
// Returns: Currently available playlists

// Get specific playlist
const playlist = await client.playlists.getById('Playlist_DefaultSolo');
// Returns: Detailed playlist information
```

---

### FN (Fortnite Game) - **NEW**

Fortnite-specific game data including inventory, features, and settings.

#### Battle Royale Inventory
Get player V-Bucks and in-game currency:

```typescript
const inventory = await client.fn.getBRInventory('accountId123');
// Returns: { stash: { globalcash: 1250 } }
console.log(`Player has ${inventory.stash.globalcash} V-Bucks`);
```

#### Storefront Keychain
Get encryption keys for storefront data:

```typescript
const keychain = await client.fn.getKeychain();
// Returns: Storefront encryption keychain
```

#### Purchase Receipts
Get player purchase history:

```typescript
const receipts = await client.fn.getReceipts('accountId123');
// Returns: Array of purchase receipts
```

#### Enabled Features
Get currently active game features:

```typescript
const features = await client.fn.getEnabledFeatures();
// Returns: Currently enabled game features
```

#### Version Check
Validate game client version:

```typescript
const versionCheck = await client.fn.checkVersion(
  'Windows',
  '++Fortnite+Release-30.40-CL-35235494-Windows'
);
// Returns: { type: 'NO_UPDATE' } or update information
```

#### Privacy Settings (Requires User Token)
Manage player privacy settings:

```typescript
// Get privacy settings
const privacy = await client.fn.getPrivacySettings(
  'accountId123',
  'fortniteToken'
);

// Update privacy settings
await client.fn.updatePrivacySettings(
  'accountId123',
  {
    optOutOfPublicLeaderboards: true
  },
  'fortniteToken'
);
```

#### Entitlement (Requires User Token)
Check and request Fortnite access:

```typescript
// Check if user has Fortnite access
const check = await client.fn.checkEntitlement('fortniteToken');

// Request Fortnite access
await client.fn.requestEntitlement('accountId123', 'fortniteToken');
```

---

## 🔐 Authentication

Some endpoints require user-specific authentication:

### Endpoints Requiring User Token:
- `client.quests.getQuests()`
- `client.tournaments.getTracker()`
- `client.tournaments.checkEligibility()`
- `client.tournaments.download()`
- `client.fn.getPrivacySettings()`
- `client.fn.updatePrivacySettings()`
- `client.fn.checkEntitlement()`
- `client.fn.requestEntitlement()`

**How to obtain user tokens:**

1. Use the OAuth flow:
```typescript
const flow = await client.oauth.startFlow();
// Direct user to flow.verificationUri
const auth = await client.oauth.completeFlow(flow.flowId);
// Use auth.accessToken as the fortniteToken parameter
```

---

## 🚀 Advanced Usage

### Custom Base URL

```typescript
const client = new FortniteAPI({
  apiKey: "your-api-key",
  baseUrl: "https://custom-api-url.com/api",
});
```

### Error Handling

```typescript
import { FortniteAPIError } from "@yaelouuu/fortnite-api";

try {
  const shop = await client.shop.getCurrent();
} catch (error) {
  if (error instanceof FortniteAPIError) {
    console.error(`API Error: ${error.message}`);
    console.error(`Status Code: ${error.statusCode}`);
    console.error(`Details:`, error.data);
  }
}
```

---

## 📖 Documentation

- **Full API Documentation (Swagger)**: https://documentation.api-fortnite.com/documentation
- **SDK Documentation**: https://sdk.api-fortnite.com/
- **Support**: https://api-fortnite.com

---

## 📝 License

MIT

---

## 🆕 Changelog

### v4.3.0 (2026-01-08)
- ✨ **NEW** `NewsResource` with 4 methods:
  - Battle Royale news
  - Save The World news
  - Creative news
  - All news in one call
- ✨ **NEW** `CosmeticsResource` with 4 methods:
  - Browse all cosmetics with filters (type, rarity, set)
  - Search cosmetics by name
  - Get cosmetic by ID
  - Get newly added cosmetics
- ✨ **NEW** `CrewResource` with 2 methods:
  - Current Crew Pack
  - Crew Pack history
- ✨ **NEW** `MapResource` with 3 methods:
  - Current map with POIs
  - Map image URL
  - Historical map data
- ✨ **NEW** `PlaylistsResource` with 3 methods:
  - All playlists/game modes
  - Active playlists only
  - Specific playlist by ID
- 📝 Comprehensive TypeScript types for all new endpoints
- 🎯 Complete SDK coverage for all API endpoints
- ✅ 100% backward compatible

### v4.2.0 (2026-01-06)
- ✨ **NEW** `AccountResource` with 8 methods:
  - Account lookups by ID, display name, and external platforms
  - Cross-platform search (PSN, Xbox, Steam, Nintendo, Twitch, GitHub)
  - Bulk operations (up to 100 accounts)
  - External authentication management
- ✨ **NEW** `FNResource` with 9 methods:
  - BR inventory (V-Bucks)
  - Storefront keychain
  - Purchase receipts
  - Enabled features
  - Version checking
  - Privacy settings management
  - Entitlement checking
- 📝 Comprehensive TypeScript types for all new endpoints
- 🎯 Full JSDoc documentation
- ✅ 100% backward compatible

### v4.1.0
- ✨ Added `WeaponsResource` with weapon stats and metadata
- 🐛 Various bug fixes and improvements

### v4.0.0
- ✨ Added `QuestsResource` with `getQuests()` method
- ✨ Added `getLeaderboardV2()` method to `TournamentsResource`
- 🐛 Fixed typo in `battlepass` property name
- 📝 Comprehensive JSDoc documentation for all resources
- 🎯 Full TypeScript type coverage
