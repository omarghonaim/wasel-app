import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { useSettings } from '@/hooks/useSettings';

export default function App() {
  const { settings } = useSettings();

  return (
    <Layout settings={settings}>
      <Home settings={settings} />
    </Layout>
  );
}
