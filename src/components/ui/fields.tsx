import * as React from 'react';
import { cn } from '@/lib/utils';

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
}

export function Field({ label, htmlFor, error, hint, children, required }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-900">
        {label} {required && <span aria-hidden className="text-red-600">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-sm text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputCls = (invalid?: boolean) =>
  cn(
    'h-11 w-full rounded-[4px] border bg-white px-3 text-base text-ink-950 placeholder:text-ink-400 min-h-[44px]',
    invalid ? 'border-red-500' : 'border-ink-200 focus:border-brand-600',
  );

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <a href={it.href} className="hover:text-brand-700 hover:underline">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="font-medium text-ink-900">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-[4px] border border-ink-200">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <caption className="sr-only">Technical specifications</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-ink-100 last:border-0 odd:bg-ink-50/60">
              <th scope="row" className="w-44 px-4 py-3 font-semibold text-ink-900 align-top">
                {r.label}
              </th>
              <td className="px-4 py-3 text-ink-700">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
