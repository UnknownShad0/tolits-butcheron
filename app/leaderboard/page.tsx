'use client';
import { cv } from '@/components/ui';
import { useFetch } from '@/lib/useFetch';
import { FetchError, FetchLoading } from '@/components/FetchState';
import type { LeaderboardEntry } from '@/lib/types';
import PlaceholderMedia from '@/components/PlaceholderMedia';

export default function LeaderboardPage() {
  const { data: leaders, error, loading } = useFetch<LeaderboardEntry[]>('/leaderboard');

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide mb-1" style={{ color: cv.text }}>Leaderboard</h1>
      <p className="text-sm font-semibold mb-6" style={{ color: cv.gold }}>
        🏆 Top scorer recognition is updated every week.
      </p>
      {error && <FetchError message={error} />}
      {loading && <FetchLoading />}
      {!loading && !error && leaders?.length === 0 && <p style={{ color: cv.textDim }}>No stats recorded yet.</p>}
      {leaders && leaders.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: cv.border }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: cv.primary, color: cv.bg }}>
                <tr>
                  {['Rank', '', 'Player', 'Team', 'GP', 'PPG', 'APG', 'RPG'].map((h) => (
                    <th key={h} className={`px-4 py-3 font-display uppercase ${['GP','PPG','APG','RPG'].includes(h) ? 'text-center' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaders.map((l, i) => (
                  <tr key={l.player_id} className="border-t" style={{
                    backgroundColor: i === 0 ? 'color-mix(in srgb, var(--primary) 10%, var(--surface))' : i % 2 === 0 ? cv.surface : cv.surfaceDeep,
                    borderColor: cv.border,
                  }}>
                    <td className="px-4 py-3 font-bold text-lg" style={{ color: cv.text }}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </td>
                    <td className="px-3 py-2">
                      <PlaceholderMedia label="Player photo placeholder" kind="person" compact className="w-9 h-9 rounded-full border-2" />
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: cv.text }}>{l.player?.name ?? `Player #${l.player_id}`}</td>
                    <td className="px-4 py-3" style={{ color: cv.primaryLight }}>{l.player?.team?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-center" style={{ color: cv.textMuted }}>{l.games_played}</td>
                    <td className="px-4 py-3 text-center font-display font-bold text-base" style={{ color: cv.gold }}>{l.ppg}</td>
                    <td className="px-4 py-3 text-center" style={{ color: cv.textMuted }}>{(l.total_assists / l.games_played).toFixed(1)}</td>
                    <td className="px-4 py-3 text-center" style={{ color: cv.textMuted }}>{(l.total_rebounds / l.games_played).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl p-4 flex items-center gap-3 border" style={{ backgroundColor: cv.surface, borderColor: cv.border }}>
            <PlaceholderMedia label="Sponsor logo placeholder" kind="logo" compact className="w-10 h-10 rounded-full flex-shrink-0" />
            <p className="text-sm" style={{ color: cv.textMuted }}>
              <strong style={{ color: cv.primaryLight }}>Sponsor space available.</strong> Approved sponsor details and weekly prize information can be added here.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
