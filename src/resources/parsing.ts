import { FortniteAPI } from "../client";
import {
  ParsingResponse,
  BatchParsingResponse,
  ParsedReplayData,
} from "../types";

export class ParsingResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Parse a single Fortnite replay file
   * @param file - File object (Browser) or Blob/Buffer (Node.js)
   * @param filename - Optional filename (required in Node.js)
   */
  async parseReplay(
    file: File | Blob,
    filename?: string
  ): Promise<ParsedReplayData> {
    const formData = new FormData();

    // In browser: File object has name
    // In Node.js: Need to pass filename
    if (file instanceof File) {
      formData.append("File", file);
    } else {
      formData.append("File", file, filename || "replay.replay");
    }

    const response = await this.client.requestMultipart<ParsingResponse>(
      "/parsing",
      formData
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to parse replay");
    }

    return response.data;
  }

  /**
   * Parse multiple Fortnite replay files in batch
   * @param files - Array of File objects or Blobs
   * @param filenames - Optional array of filenames (required in Node.js)
   */
  async parseMultipleReplays(
    files: (File | Blob)[],
    filenames?: string[]
  ): Promise<ParsedReplayData[]> {
    const formData = new FormData();

    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append("Files", file);
      } else {
        const name = filenames?.[index] || `replay-${index}.replay`;
        formData.append("Files", file, name);
      }
    });

    const response = await this.client.requestMultipart<BatchParsingResponse>(
      "/parsing/multiple",
      formData
    );

    if (!response.success || !response.results) {
      throw new Error(response.error || "Failed to parse replays");
    }

    return response.results;
  }
}
