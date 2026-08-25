import { ProductServiceHero } from '@/components/ProductServiceHero';
import { WaselWorksSection } from '@/components/WaselWorksSection';
import { ProductServiceAppSection } from '@/components/ProductServiceAppSection';
import { DownloadAppSection } from '@/components/DownloadAppSection';
import type { SiteSettings } from '@/types/settings';

export function ProductService({ settings }: { settings: SiteSettings | null }) {
  const handleDownloadApp = () => {
    const android = settings?.appUrlAndroid;
    const ios = settings?.appUrlIos;
    const target = android || ios;
    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="wasel-product-service-page">
      <ProductServiceHero
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        onDownloadApp={handleDownloadApp}
      />
      <WaselWorksSection
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
      />
      <ProductServiceAppSection />
      <DownloadAppSection
        appUrlIos={settings?.appUrlIos}
        appUrlAndroid={settings?.appUrlAndroid}
      />
    </main>
  );
}
