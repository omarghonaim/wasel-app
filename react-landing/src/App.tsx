import { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { ProductService } from '@/pages/ProductService';
import { Contact } from '@/pages/Contact';
import { useSettings } from '@/hooks/useSettings';
import { useLandingRoute } from '@/hooks/useLandingRoute';

export default function App() {
  const { settings } = useSettings();
  const { route } = useLandingRoute();

  useEffect(() => {
    if (route === 'about' || route === 'product-and-service' || route === 'contact-us') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [route]);

  const showFooterTopPattern = route === 'home';

  return (
    <Layout settings={settings} showFooterTopPattern={showFooterTopPattern}>
      {route === 'about' ? (
        <About settings={settings} />
      ) : route === 'product-and-service' ? (
        <ProductService settings={settings} />
      ) : route === 'contact-us' ? (
        <Contact settings={settings} />
      ) : (
        <Home settings={settings} />
      )}
    </Layout>
  );
}
