import { cn } from '@/lib/utils';

export function Badge({ children, tone = 'neutral', className }: { children: React.ReactNode; tone?: 'neutral' | 'brand' | 'copper' | 'success' | 'new'; className?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-ink-50 text-ink-800 border-ink-200',
    brand: 'bg-brand-50 text-brand-800 border-brand-200',
    copper: 'bg-amber-50 text-amber-900 border-amber-200',
    success: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    new: 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold leading-none', tones[tone], className)}>
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-brand-700">
          <span aria-hidden className="inline-block h-px w-6 bg-brand-700" /> {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-balance">{title}</h2>
      {intro && <p className="mt-3 text-[17px] leading-relaxed text-ink-600">{intro}</p>}
    </div>
  );
}

export function Alert({ tone = 'info', title, children }: { tone?: 'info' | 'success' | 'error'; title?: string; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    info: 'border-brand-300 bg-brand-50 text-brand-950',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-950',
    error: 'border-red-300 bg-red-50 text-red-950',
  };
  return (
    <div role="alert" className={cn('rounded-md border-l-4 p-4 shadow-surface', tones[tone])}>
      {title && <p className="font-bold">{title}</p>}
      <div className="mt-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-md bg-ink-100', className)} />;
}

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-ink-300 bg-ink-50/60 px-6 py-12 text-center">
      <p className="text-lg font-bold text-ink-900">{title}</p>
      {body && <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-600">{body}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
