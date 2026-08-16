import { AboutHero } from '@/components/AboutHero';
import { OurStory } from '@/components/OurStory';
import { AboutStats } from '@/components/AboutStats';
import { MissionVision } from '@/components/MissionVision';
import { AboutCta } from '@/components/AboutCta';
import type { SiteSettings } from '@/types/settings';

export function About({ settings }: { settings: SiteSettings | null }) {
  const handleDownloadApp = () => {
    const android = settings?.appUrlAndroid;
    const ios = settings?.appUrlIos;
    const target = android || ios;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="wasel-about-page">
      <AboutHero
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        onDownloadApp={handleDownloadApp}
      />
      <OurStory />
      <AboutStats />
      <MissionVision />
      <AboutCta onDownloadApp={handleDownloadApp} />
    </main>
  );
}
