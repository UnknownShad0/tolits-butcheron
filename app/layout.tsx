import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/lib/auth';
import { cv } from '@/components/ui';
import PlaceholderMedia from '@/components/PlaceholderMedia';

export const metadata: Metadata = {
  title: "Basketball",
  description: "Community basketball platform for players, teams, matches, and statistics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }} className="min-h-screen flex flex-col">
        <ThemeProvider>
          <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">{children}</main>

<footer
  className="border-t"
  style={{ backgroundColor: cv.surfaceDeep, borderColor: cv.border }}
>
  <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 items-center text-center md:text-left">
    
    {/* League identity */}
    <div className="flex flex-col items-center">
      <PlaceholderMedia label="League logo placeholder" kind="logo" compact className="w-14 h-14 rounded-full mb-3 shadow-md" />

      <p className="text-sm" style={{ color: cv.textMuted }}>
        <span
          className="font-bold tracking-wide"
          style={{ color: cv.primaryLight }}
        >
          COMMUNITY BASKETBALL LEAGUE
        </span>
      </p>

      <p className="text-xs mt-1" style={{ color: cv.textDim }}>
        Players, games, and stats in one place.
      </p>
    </div>

    {/* Venue */}
    <div className="flex flex-col items-center gap-2">
      <p
        className="text-sm font-semibold"
        style={{ color: cv.primaryLight }}
      >
        League Venue
      </p>

      <p className="text-xs" style={{ color: cv.textMuted }}>
        Venue details placeholder
      </p>
    </div>

    {/* Contact */}
    <div className="flex flex-col items-center  gap-2">
      <p
        className="text-sm font-semibold"
        style={{ color: cv.primaryLight }}
      >
        League Contact
      </p>
      <p className="text-xs" style={{ color: cv.textMuted }}>
        Contact and social links placeholder
      </p>
    </div>
  </div>

  {/* Bottom bar */}
  <div
    className="text-center text-xs py-3 border-t"
    style={{ borderColor: cv.border, color: cv.textDim }}
  >
    © {new Date().getFullYear()} Community Basketball League. All rights reserved.
  </div>
</footer>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
