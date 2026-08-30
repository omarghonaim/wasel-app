import { ContactSection } from '@/components/ContactSection';
import type { SiteSettings } from '@/types/settings';

export function Contact({ settings }: { settings: SiteSettings | null }) {
  const handleDownloadApp = () => {
    const android = settings?.appUrlAndroid;
    const ios = settings?.appUrlIos;
    const target = android || ios;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="wasel-contact-page">
      <ContactSection
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        onDownloadApp={handleDownloadApp}
        mapApiKey={settings?.mapApiKey ?? null}
        mapCenter={settings?.mapCenter ?? null}
      />
    </main>
  );
}
