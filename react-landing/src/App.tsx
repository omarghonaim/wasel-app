import { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { useSettings } from '@/hooks/useSettings';
import { useLandingRoute } from '@/hooks/useLandingRoute';

export default function App() {
  const { settings } = useSettings();
  const { route } = useLandingRoute();

  useEffect(() => {
    if (route === 'about') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [route]);

  return (
    <Layout settings={settings} showFooterTopPattern={route !== 'about'}>
      {route === 'about' ? (
        <About settings={settings} />
      ) : (
        <Home settings={settings} />
      )}
    </Layout>
  );
}
