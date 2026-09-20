import { Breadcrumbs } from '@/components/ui/fields';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({ title: 'Privacy Policy', description: 'How Masaai Glassmart handles enquiry data. Requires legal review before launch.', path: '/privacy' });

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <h1 className="mt-3">Privacy policy</h1>
      <p className="mt-2 text-sm text-ink-500">Template requiring review by qualified counsel before launch. Contact: {SITE.contact.privacyContact}</p>
      <div className="prose mt-6 grid gap-4 text-ink-700">
        <p>We collect only the details you provide (name, contact, project information and attachments) to prepare quotations and respond to enquiries.</p>
        <p>We do not sell personal data. Analytics, if enabled, is privacy-friendly and never includes personal information in events.</p>
        <p>Enquiry data is retained only as long as needed for quotation, project and legal purposes. Ask us about retention periods at {SITE.contact.privacyContact}.</p>
        <p>File uploads are validated by type and size and stored securely; uploaded files are never executed.</p>
        <p>Marketing consent is separate and unchecked by default.</p>
        <p>[COMPANY_REGISTRATION_DETAILS] [TAX_DETAILS] — replace before launch.</p>
      </div>
    </div>
  );
}
