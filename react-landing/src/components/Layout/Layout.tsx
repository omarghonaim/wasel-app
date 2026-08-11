import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import type { SiteSettings } from '@/types/settings';

type LayoutProps = {
  children: ReactNode;
  settings: SiteSettings | null;
};

export function Layout({ children, settings }: LayoutProps) {
  return (
    <>
      {children}
      <Footer
        logo={settings?.logo ?? null}
        businessName={settings?.businessName}
        appUrlIos={settings?.appUrlIos}
        appUrlAndroid={settings?.appUrlAndroid}
      />
    </>
  );
}
