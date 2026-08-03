import { FortniteAPI } from "../client";
import {
  PowerRankingsLeaderboard,
  PowerRankingsSearchResponse,
  PowerRankingsArchiveEntry,
  PowerRankingsPlayerEntry,
} from "../types";

/**
 * Power Rankings Resource
 *
 * Epic's own competitive Power Rankings ladder — the same figure shown in the
 * in-game Compete tab and on Fortnite's competitive site. It is read live from
 * Epic's events service (`epicgames_dreamyparadox`); nothing here is computed by
 * the API or sourced from a third-party tracker.
 *
 * The ladder covers the top 10,000 players (100 pages x 100 entries) and is
 * chapter-scoped (e.g. `"C7 Power Rankings"`).
 *
 * Epic publishes the ladder as a periodic snapshot: every entry on every page
 * carries the same `sessionHistory[0].endTime`, which is the date of the snapshot
 * currently being served. The API re-fetches Epic hourly and rebuilds the search
 * index every 2 hours, so polling more often than that will not surface newer data.
 *
 * All methods require the `pro` or `custom` plan.
 */
export class PowerRankingsResource {
  constructor(private client: FortniteAPI) {}

  /**
   * Get a page of the Power Rankings leaderboard.
   *
   * 100 entries per page, 100 pages total (top 10,000). No `x-fortnite-token`
   * needed for the global page.
   *
   * Per entry: `rank`, `pointsEarned` / `score` (the PR value),
   * `teamAccountIds`, `teamAccountDisplayNames`, `playerFlagTokens` (region), and
   * `sessionHistory[0].trackedStats` with `PR`, `countingEvents` (capped at 20),
   * `peakPerf`, `deltaPR`, `peakPR` and `deltaPosition`.
   *
   * @param options.page - Zero-indexed page (default: 0, max: 99)
   * @param options.accountId - Epic account ID of the token holder. Required when
   *                            `fortniteToken` is supplied, ignored otherwise.
   * @param fortniteToken - Optional. When supplied together with `accountId`, the
   *                        response also carries that player's own entry as
   *                        `playerEntry` (`null` when they are unranked), even if
   *                        they sit outside the requested page.
   */
  async getLeaderboard(
    options?: { page?: number; accountId?: string },
    fortniteToken?: string,
  ): Promise<PowerRankingsLeaderboard> {
    const params = new URLSearchParams();
    if (options?.page != null) params.append("page", String(options.page));
    if (options?.accountId) params.append("accountId", options.accountId);

    const qs = params.toString();
    const requestOptions = fortniteToken
      ? { headers: { "x-fortnite-token": fortniteToken } }
      : undefined;

    return this.client.request<PowerRankingsLeaderboard>(
      `/events/powerrankings${qs ? `?${qs}` : ""}`,
      requestOptions,
    );
  }

  /**
   * Search Power Rankings players by display name (partial, case-insensitive).
   *
   * Backed by an in-memory index built from the full 10,000-player leaderboard and
   * rebuilt every 2 hours. **No `x-fortnite-token` required** — this is the simplest
   * way to resolve a player's PR when you do not have their OAuth token.
   *
   * @param q - Display name search term (partial match; 2+ characters recommended)
   * @param limit - Max results (default: 10, max: 50)
   */
  async search(q: string, limit?: number): Promise<PowerRankingsSearchResponse> {
    const params = new URLSearchParams({ q });
    if (limit != null) params.append("limit", String(limit));

    return this.client.request<PowerRankingsSearchResponse>(
      `/events/powerrankings/search?${params.toString()}`,
    );
  }

  /**
   * Look up a player's live Power Rankings entry by display name or account ID.
   *
   * **`fortniteToken` is mandatory, and it must belong to the player being looked
   * up.** Epic rejects the `teamAccountIds` filter this endpoint relies on when the
   * request carries service auth, so a token-less call returns **400** for every
   * account — including accounts that sit inside the top 10,000. With the token the
   * entry resolves even when the player is ranked beyond the top 10,000.
   *
   * Get a token through the OAuth flow: `client.oauth.getToken()` then
   * `client.oauth.complete()`.
   *
   * If you do not have the player's token, use {@link search} or
   * {@link getFromArchive} instead — same PR figures, no OAuth required.
   *
   * @param identifier - Epic display name or 32-char hex account ID (clan tags are
   *                     stripped automatically)
   * @param fortniteToken - Required. Fortnite access token of the player being looked up.
   *
   * @throws {FortniteAPIError} 400 when the token is missing, expired, or belongs to
   *                            a different account
   * @throws {FortniteAPIError} 404 when the player has no Power Rankings entry
   */
  async getPlayer(
    identifier: string,
    fortniteToken: string,
  ): Promise<PowerRankingsPlayerEntry> {
    return this.client.request<PowerRankingsPlayerEntry>(
      `/events/powerrankings/player/${encodeURIComponent(identifier)}`,
      { headers: { "x-fortnite-token": fortniteToken } },
    );
  }

  /**
   * Look up a player's most recent archived Power Rankings entry by account ID.
   *
   * **No `x-fortnite-token` required.** Works for any account that has appeared in
   * the top-10,000 leaderboard. Returns `rank`, `score`, `bestRank`, `peakPr`,
   * `deltaPr`, `countingEvents`, `seasonLabel` and `lastUpdated` — read the
   * `lastUpdated` timestamp to see how fresh the archived row is.
   *
   * @param accountId - 32-char hex Epic account ID
   *
   * @throws {FortniteAPIError} 404 when the account is not in the archive
   */
  async getFromArchive(accountId: string): Promise<PowerRankingsArchiveEntry> {
    return this.client.request<PowerRankingsArchiveEntry>(
      `/events/powerrankings/archive/${encodeURIComponent(accountId)}`,
    );
  }
}
