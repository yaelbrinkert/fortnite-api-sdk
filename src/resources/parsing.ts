import { FortniteAPI } from "../client";
import {
  ParsingResponse,
  BatchParsingResponse,
  ParsedReplayData,
} from "../types";

export class ParsingResource {
  constructor(private client: FortniteAPI) {}

  private buildFormData(file: File | Blob, filename?: string): FormData {
    const formData = new FormData();
    if (file instanceof File) {
      formData.append("file", file);
    } else {
      formData.append("file", file, filename || "replay.replay");
    }
    return formData;
  }

  private buildMultiFormData(files: (File | Blob)[], filenames?: string[]): FormData {
    const formData = new FormData();
    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append("files", file);
      } else {
        formData.append("files", file, filenames?.[index] || `replay-${index}.replay`);
      }
    });
    return formData;
  }

  /**
   * Parse a single Fortnite replay file — full parse.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object (Browser) or Blob (Node.js)
   * @param filename - Filename (required in Node.js when passing a Blob)
   */
  async parseReplay(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay");
    }
    return response.data;
  }

  /**
   * Parse a single replay — stats only (faster, skips movement/zones/kill feed).
   * Returns: name, replayId, version, stats (elims, damage, accuracy, placement, assists, etc.).
   * Subject to per-plan parsing quota limits (1 credit).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayStats(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/stats",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay stats");
    }
    return response.data;
  }

  /**
   * Parse a single replay — map context.
   * Returns: bus flight path + drop window, all storm circles with timing, supply drops, llamas, reboot vans.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayMap(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/map",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay map");
    }
    return response.data;
  }

  /**
   * Parse a single replay — ground loot data.
   * Returns all items that were on the ground near the player: position, item ID, picked-up status and time.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayLoot(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/loot",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay loot");
    }
    return response.data;
  }

  /**
   * Parse a single replay — match timeline.
   * Returns all events relative to bus drop: kills, knocks, own death, damage dealt/taken, healed, pickups.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayTimeline(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/timeline",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay timeline");
    }
    return response.data;
  }

  /**
   * Parse a single replay — storm zone data.
   * Returns all safe zone phases with circle positions, timing, damage per tick, and phase count.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayZones(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/zones",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay zones");
    }
    return response.data;
  }

  /**
   * Parse a single replay — full player lobby.
   * Returns all players with placement, kills, death info, cosmetics, and team data.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayLobby(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/lobby",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay lobby");
    }
    return response.data;
  }

  /**
   * Parse a single replay — full broadcast payload.
   * Combines all data: header, stats, full lobby, storm zones, map objects, ground loot, and timeline.
   * Equivalent to calling all parse endpoints in one request.
   * Subject to per-plan parsing quota limits (20 credits).
   * @param file - File object or Blob
   * @param filename - Filename (required in Node.js)
   */
  async parseReplayBroadcast(file: File | Blob, filename?: string): Promise<ParsedReplayData> {
    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing/broadcast",
      this.buildFormData(file, filename)
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay broadcast");
    }
    return response.data;
  }

  /**
   * Parse multiple replay files in batch — full parse.
   * All files are processed in parallel.
   * Subject to per-plan parsing quota limits (10 credits).
   * @param files - Array of File objects or Blobs
   * @param filenames - Filenames (required in Node.js when passing Blobs)
   */
  async parseMultipleReplays(files: (File | Blob)[], filenames?: string[]): Promise<ParsedReplayData[]> {
    const response = await this.client.requestMultipart<BatchParsingResponse>(
      "/parsing/multiple",
      this.buildMultiFormData(files, filenames)
    );
    if (!response.success || !response.results) {
      throw new Error(response.error || "Failed to parse replays");
    }
    return response.results;
  }

  /**
   * Parse multiple replay files — stats only.
   * Faster than full parse — skips movement, zones, and kill feed.
   * Subject to per-plan parsing quota limits (5 credits).
   * @param files - Array of File objects or Blobs
   * @param filenames - Filenames (required in Node.js)
   */
  async parseMultipleReplaysStats(files: (File | Blob)[], filenames?: string[]): Promise<ParsedReplayData[]> {
    const response = await this.client.requestMultipart<BatchParsingResponse>(
      "/parsing/multiple/stats",
      this.buildMultiFormData(files, filenames)
    );
    if (!response.success || !response.results) {
      throw new Error(response.error || "Failed to parse replays stats");
    }
    return response.results;
  }

  /**
   * Parse multiple replay files — map context for each.
   * Returns bus path, storm circles, supply drops, llamas, reboot vans per file.
   * Subject to per-plan parsing quota limits (10 credits).
   * @param files - Array of File objects or Blobs
   * @param filenames - Filenames (required in Node.js)
   */
  async parseMultipleReplaysMap(files: (File | Blob)[], filenames?: string[]): Promise<ParsedReplayData[]> {
    const response = await this.client.requestMultipart<BatchParsingResponse>(
      "/parsing/multiple/map",
      this.buildMultiFormData(files, filenames)
    );
    if (!response.success || !response.results) {
      throw new Error(response.error || "Failed to parse replays map");
    }
    return response.results;
  }

  /**
   * Parse multiple replay files — ground loot data for each.
   * Subject to per-plan parsing quota limits (10 credits).
   * @param files - Array of File objects or Blobs
   * @param filenames - Filenames (required in Node.js)
   */
  async parseMultipleReplaysLoot(files: (File | Blob)[], filenames?: string[]): Promise<ParsedReplayData[]> {
    const response = await this.client.requestMultipart<BatchParsingResponse>(
      "/parsing/multiple/loot",
      this.buildMultiFormData(files, filenames)
    );
    if (!response.success || !response.results) {
      throw new Error(response.error || "Failed to parse replays loot");
    }
    return response.results;
  }
}
