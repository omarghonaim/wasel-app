import { useEffect, useState } from 'react';

export type LandingRoute = 'home' | 'about' | 'product-and-service' | 'contact-us';

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function readRoute(): LandingRoute {
  if (typeof window === 'undefined') return 'home';
  const path = normalizePath(window.location.pathname);
  if (path === '/about') return 'about';
  if (path === '/product-and-service') return 'product-and-service';
  if (path === '/contact-us') return 'contact-us';
  return 'home';
}

export function useLandingRoute(): { route: LandingRoute } {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    if (window.location.hash === '#about') {
      window.history.replaceState({}, '', '/about');
      setRoute('about');
    } else if (window.location.hash === '#products') {
      window.history.replaceState({}, '', '/product-and-service');
      setRoute('product-and-service');
    } else if (window.location.hash === '#contact') {
      window.history.replaceState({}, '', '/contact-us');
      setRoute('contact-us');
    }

    const onChange = () => setRoute(readRoute());
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return { route };
}
