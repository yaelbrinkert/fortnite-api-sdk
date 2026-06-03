import { FortniteAPI } from "../client";
import { ParsedReplayData } from "../types";

/**
 * Replays Resource
 * Download and parse tournament server replay files by match ID.
 * Match IDs come from Epic's tournament events API.
 * All parse endpoints subject to per-plan parsing quota limits.
 */
export class ReplaysResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Download a tournament replay file by match ID.
   * Returns the raw .replay binary as an ArrayBuffer.
   * @param matchId - Match ID from Epic's tournament events API
   */
  async download(matchId: string): Promise<ArrayBuffer> {
    return this.client.requestBinary(`/replays/${encodeURIComponent(matchId)}`);
  }

  /**
   * Get the raw chunk manifest (metadata) for a tournament replay.
   * Returns Events, DataChunks, Checkpoints arrays with timing info.
   * @param matchId - Match ID from Epic's tournament events API
   */
  async getMetadata(matchId: string): Promise<any> {
    return this.client.request<any>(
      `/replays/${encodeURIComponent(matchId)}/metadata`,
      {},
      "v1"
    );
  }

  /**
   * Download and fully parse a tournament replay — full parse.
   * Returns the same structure as POST /api/v1/parsing.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parse(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — stats only.
   * Faster than full parse. Returns name, replayId, version, playlist, teamSize, teamCount, isTournament, tournamentRound, stats.
   * Subject to per-plan parsing quota limits (1 credit).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseStats(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/stats`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — map context.
   * Returns bus path, storm circles, supply drops, llamas, reboot vans.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseMap(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/map`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — ground loot.
   * Server replays give whole-map loot coverage (vs ~150m radius for client replays).
   * Returns all item spawns: position, item ID, picked-up status and time.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseLoot(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/loot`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — full player lobby.
   * Returns all players with kills, placement, damage, reboots, headshots, teamKills, death info, and cosmetics.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseLobby(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/lobby`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — storm zones.
   * Returns all safe zone phases with timing, positions, and damage per tick.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseZones(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/zones`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — match timeline.
   * Returns chronological event feed: kills, knocks, death, damage dealt/taken, heals, pickups.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseTimeline(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/timeline`,
      {},
      "v1"
    );
  }

  /**
   * Download and parse a tournament replay — full broadcast payload.
   * Combines all data: stats, full lobby, storm zones, map objects, ground loot, and timeline.
   * Equivalent to calling all parse endpoints in one request.
   * Subject to per-plan parsing quota limits (20 credits).
   * @param matchId - Match ID from Epic's tournament events API
   */
  async parseBroadcast(matchId: string): Promise<ParsedReplayData> {
    return this.client.request<ParsedReplayData>(
      `/replays/${encodeURIComponent(matchId)}/parse/broadcast`,
      {},
      "v1"
    );
  }
}
