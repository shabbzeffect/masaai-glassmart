import { Breadcrumbs } from '@/components/ui/fields';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Cookie Policy', description: 'Cookie and tracking disclosure for Masaai Glassmart.', path: '/cookies' });

export default function CookiesPage() {
  return (
    <div className="container-x max-w-3xl py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cookies' }]} />
      <h1 className="mt-3">Cookie policy</h1>
      <div className="mt-6 grid gap-4 text-ink-700">
        <p>By default this site avoids non-essential cookies. Theme preference is stored locally on your device. Analytics, if enabled, uses a privacy-conscious provider without cross-site tracking.</p>
        <p>Embedded maps are link-based by default to avoid third-party tracking until you click through.</p>
        <p>Non-essential tracking requires consent where applicable law requires it.</p>
      </div>
    </div>
  );
}
