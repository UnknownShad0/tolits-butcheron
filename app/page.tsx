import Link from 'next/link';
import { cv } from '@/components/ui';
import PlaceholderMedia from '@/components/PlaceholderMedia';

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-12">
        <PlaceholderMedia label="League logo placeholder" kind="logo" className="w-28 h-28 rounded-full mx-auto mb-4 border-4" />
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-wide" style={{ color: cv.text }}>
          Community Basketball League
        </h1>
        <p className="mt-2 text-base" style={{ color: cv.primaryLight }}>
          Track players, games, and stats — powered by the community.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link href="/leaderboard" className="px-6 py-2.5 rounded font-bold font-display uppercase tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: cv.primary, color: cv.bg }}>
            Leaderboard
          </Link>
          <Link href="/matches" className="px-6 py-2.5 rounded font-bold font-display uppercase tracking-wide border transition-opacity hover:opacity-80"
            style={{ borderColor: cv.primary, color: cv.primaryLight }}>
            Matches
          </Link>
        </div>
      </section>

      {/* Player of the Week */}
      <section className="rounded-xl p-6 text-center border" style={{ backgroundColor: cv.surface, borderColor: cv.gold }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: cv.gold }}>
          Weekly Highlight
        </p>
        <h2 className="font-display text-3xl font-bold uppercase" style={{ color: cv.text }}>⭐ Player of the Week</h2>
        <p className="text-sm mt-2 italic" style={{ color: cv.primaryLight }}>
          Check the leaderboard to see who&apos;s dominating this week!
        </p>
        <Link href="/leaderboard" className="mt-3 inline-block text-sm font-semibold hover:underline" style={{ color: cv.gold }}>
          See Leaderboard →
        </Link>
      </section>

      {/* Sponsor Spotlight */}
      <section className="rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center border" style={{ backgroundColor: cv.surface, borderColor: cv.primary }}>
        <PlaceholderMedia label="Sponsor logo placeholder" kind="logo" className="w-24 h-24 rounded-xl flex-shrink-0" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: cv.primaryLight }}>Sponsor Spotlight</p>
          <h2 className="font-display text-2xl font-bold uppercase mt-1" style={{ color: cv.text }}>
            Sponsor Name
          </h2>
          <p className="text-sm mt-1" style={{ color: cv.textMuted }}>
            Add approved sponsor details here when licensed brand assets and copy are available.
          </p>
          <p className="mt-2 text-xs font-semibold" style={{ color: cv.gold }}>
            🏆 Weekly prize details coming soon.
          </p>
        </div>
      </section>

      {/* Team photos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: cv.border }}>
          <PlaceholderMedia label="Team photo placeholder" className="w-full min-h-64" />
        </div>
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: cv.border }}>
          <PlaceholderMedia label="Team photo placeholder" className="w-full min-h-64" />
        </div>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {[
          { href: '/teams', label: '🏅 Teams' },
          { href: '/players', label: '👤 Players' },
          { href: '/matches', label: '📅 Matches' },
          { href: '/admin', label: '⚙️ Admin' },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="rounded-xl py-6 font-display font-bold uppercase tracking-wide text-sm border transition-all hover:opacity-80"
            style={{ backgroundColor: cv.surface, borderColor: cv.border, color: cv.textMuted }}>
            {item.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
