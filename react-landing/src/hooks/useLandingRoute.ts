import { useEffect, useState } from 'react';

export type LandingRoute = 'home' | 'about';

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function readRoute(): LandingRoute {
  if (typeof window === 'undefined') return 'home';
  return normalizePath(window.location.pathname) === '/about' ? 'about' : 'home';
}

export function useLandingRoute(): { route: LandingRoute } {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    if (window.location.hash === '#about') {
      window.history.replaceState({}, '', '/about');
      setRoute('about');
    }

    const onChange = () => setRoute(readRoute());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return { route };
}
