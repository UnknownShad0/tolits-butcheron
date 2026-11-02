'use client';
import { useState } from 'react';
import { Input, Select, Btn, Card, SectionTitle, colors } from '@/components/ui';
import { apiFetch } from '@/lib/api';
import type { Team, Player } from '@/lib/types';
import PlaceholderMedia from '@/components/PlaceholderMedia';

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];

export default function PlayerForm({ teams, players, onAdd }: { teams: Team[]; players: Player[]; onAdd: (p: Player) => void }) {
  const [form, setForm] = useState({ name: '', team_id: '', position: '', jersey_number: '' });
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v !== '') fd.append(k, v); });
      const p = await apiFetch<Player>('/players', { method: 'POST', body: fd });
      onAdd(p);
      setForm({ name: '', team_id: '', position: '', jersey_number: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle>Add Player</SectionTitle>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Full name" value={form.name} onChange={set('name')} required />
          <Select value={form.team_id} onChange={set('team_id')} required>
            <option value="">Select team</option>
            {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </Select>
          <Select value={form.position} onChange={set('position')}>
            <option value="">Position (optional)</option>
            {POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
          </Select>
          <Input placeholder="Jersey #" value={form.jersey_number} onChange={set('jersey_number')} />
          <div className="sm:col-span-2 flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: colors.border }}>
            <PlaceholderMedia label="Player photo placeholder" kind="person" compact className="w-10 h-10 rounded-full flex-shrink-0" />
            <p className="text-xs" style={{ color: colors.textDim }}>Player images are disabled; a neutral placeholder is used throughout the site.</p>
          </div>
          <div className="sm:col-span-2">
            <Btn type="submit" full disabled={loading}>{loading ? 'Adding…' : 'Add Player'}</Btn>
          </div>
        </form>
      </Card>

      {players.length > 0 && (
        <Card>
          <SectionTitle>Players ({players.length})</SectionTitle>
          <ul className="space-y-1">
            {players.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-3">
                  <PlaceholderMedia label="Player photo placeholder" kind="person" compact className="w-8 h-8 rounded-full flex-shrink-0" />
                  <span className="font-bold w-6 text-center text-xs" style={{ color: colors.gold }}>{p.jersey_number ?? '—'}</span>
                  <span className="font-semibold" style={{ color: colors.text }}>{p.name}</span>
                  {p.position && <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.border, color: colors.textMuted }}>{p.position}</span>}
                </div>
                <span className="text-xs" style={{ color: colors.textDim }}>{p.team?.name}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
