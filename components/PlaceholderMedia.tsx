import { ImageIcon, Shield, UserRound } from 'lucide-react';
import { cv } from '@/components/ui';

type PlaceholderMediaProps = {
  label: string;
  className?: string;
  kind?: 'image' | 'logo' | 'person';
  compact?: boolean;
};

export default function PlaceholderMedia({
  label,
  className = '',
  kind = 'image',
  compact = false,
}: PlaceholderMediaProps) {
  const Icon = kind === 'person' ? UserRound : kind === 'logo' ? Shield : ImageIcon;

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden border border-dashed ${className}`}
      style={{
        backgroundColor: cv.surfaceDeep,
        borderColor: cv.border,
        color: cv.textDim,
      }}
    >
      <div className="flex flex-col items-center justify-center gap-1.5 px-3 text-center">
        <Icon aria-hidden="true" size={compact ? 16 : 26} strokeWidth={1.6} />
        {!compact && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
