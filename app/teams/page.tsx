'use client';
import { cv } from '@/components/ui';
import { useFetch } from '@/lib/useFetch';
import { FetchError, FetchLoading } from '@/components/FetchState';
import type { Team } from '@/lib/types';
import PlaceholderMedia from '@/components/PlaceholderMedia';

export default function TeamsPage() {
  const { data: teams, error, loading } = useFetch<Team[]>('/teams');

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide mb-6" style={{ color: cv.text }}>Teams</h1>
      {error && <FetchError message={error} />}
      {loading && <FetchLoading />}
      {teams && teams.length === 0 && <p style={{ color: cv.textDim }}>No teams yet. Add one in Admin.</p>}
      {teams && teams.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          {teams.map((team) => (
            <div key={team.id} className="rounded-xl p-5 flex gap-4 items-start border transition-all hover:opacity-90"
              style={{ backgroundColor: cv.surface, borderColor: cv.border }}>
              <PlaceholderMedia label="Team logo placeholder" kind="logo" compact className="w-14 h-14 rounded-full flex-shrink-0 border-2" />
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl font-bold uppercase" style={{ color: cv.text }}>{team.name}</h2>
                <p className="text-sm mt-0.5" style={{ color: cv.textDim }}>{team.players?.length ?? 0} player(s)</p>
                {team.players && team.players.length > 0 && (
                  <ul className="mt-2 text-sm list-none space-y-1 w-full" style={{ color: cv.textMuted }}>
                    {team.players.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-4 py-0.5" style={{ borderColor: cv.border }}>
                        <span>{p.name}</span>
                        {p.position && (
                          <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: cv.border, color: cv.textDim }}>
                            {p.position}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
