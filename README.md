# Fortnite API SDK

JavaScript/TypeScript SDK for the Fortnite API by Royal Arena.

## Installation

```bash
npm install @yaelouuu/fortnite-api
```

## API Key

Acquire your API Key by creating a Free Account here : https://api-fortnite.com

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
  eventId: "epicgames_...",
  eventWindowId: "S37_...",
  page: 0,
});

// Get profile stats
const stats = await client.profiles.getStats("PlayerName");

// Get season info
const season = await client.calendar.getCurrentSeason();
```

## Features

- ✅ Full TypeScript support
- ✅ Promise-based async/await API
- ✅ Automatic error handling
- ✅ Built-in retry logic (optional)
- ✅ Tree-shakeable

## Documentation

Full API documentation (swagger): https://documentation.api-fortnite.com/documentation
SDK documentation: https://sdk.api-fortnite.com/
