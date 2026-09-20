'use client';

export function PrintButton({ label = 'Print product sheet' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print mt-3 inline-flex min-h-[44px] items-center rounded-[4px] border border-ink-300 px-5 font-bold hover:border-ink-950"
    >
      {label}
    </button>
  );
}
