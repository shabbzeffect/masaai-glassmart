'use client';
import * as React from 'react';

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-200 rounded-[4px] border border-ink-200">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              aria-expanded={isOpen}
              aria-controls={`acc-${i}`}
              id={`acc-btn-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink-950 min-h-[48px]"
            >
              {it.q}
              <span aria-hidden className="text-brand-700 text-xl leading-none">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div id={`acc-${i}`} role="region" aria-labelledby={`acc-btn-${i}`} className="px-5 pb-5 text-ink-700">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
