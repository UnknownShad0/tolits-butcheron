'use client';
import { useState } from 'react';
import { Input, Btn, Card, SectionTitle, colors } from '@/components/ui';
import { apiFetch } from '@/lib/api';
import type { Team } from '@/lib/types';
import PlaceholderMedia from '@/components/PlaceholderMedia';

export default function TeamForm({ teams, onAdd }: { teams: Team[]; onAdd: (t: Team) => void }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', name);
      const t = await apiFetch<Team>('/teams', { method: 'POST', body: fd });
      onAdd(t);
      setName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle>Add Team</SectionTitle>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Team name" value={name} onChange={(e) => setName(e.target.value)} required />
          <div className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: colors.border }}>
            <PlaceholderMedia label="Team logo placeholder" kind="logo" compact className="w-10 h-10 rounded-full flex-shrink-0" />
            <p className="text-xs" style={{ color: colors.textDim }}>Team images are disabled; a neutral placeholder is used throughout the site.</p>
          </div>
          <Btn type="submit" full disabled={loading}>{loading ? 'Adding…' : 'Add Team'}</Btn>
        </form>
      </Card>

      {teams.length > 0 && (
        <Card>
          <SectionTitle>Teams ({teams.length})</SectionTitle>
          <ul className="space-y-2">
            {teams.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: colors.border }}>
                <PlaceholderMedia label="Team logo placeholder" kind="logo" compact className="w-9 h-9 rounded-full flex-shrink-0" />
                <span className="font-semibold text-sm" style={{ color: colors.text }}>{t.name}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
