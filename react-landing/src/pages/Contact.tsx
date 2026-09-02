import { ContactHero } from '@/components/ContactHero';
import { ContactInformationSection } from '@/components/ContactInformationSection';
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
      <ContactHero
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        onDownloadApp={handleDownloadApp}
      />
      <ContactInformationSection />
      <ContactSection mapApiKey={settings?.mapApiKey ?? null} />
    </main>
  );
}
