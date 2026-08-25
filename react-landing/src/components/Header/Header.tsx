import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Product & Service', href: '/product-and-service' },
  { label: 'The Blog', href: '/#blog' },
  { label: 'Contact Us', href: '/#contact' },
] as const;

type HeaderProps = {
  logo: string | null;
  businessName?: string | null;
  onDownloadApp?: () => void;
  activeHref?: string;
};

export function Header({
  logo,
  businessName,
  onDownloadApp,
  activeHref,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const brand = businessName || 'Wasel';

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-0 z-30"
    >
      <div className="mx-auto flex h-20 w-full max-w-site items-center justify-between gap-4 px-5 md:px-8 lg:px-10">
        <a href="/#top" className="relative z-40 flex items-center gap-3">
          {logo ? (
            <img
              src={logo}
              alt={brand}
              className="h-10 w-auto max-w-[9rem] object-contain object-left md:h-11"
            />
          ) : (
            <span className="font-display text-xl font-bold tracking-tight text-surface">
              {brand}
            </span>
          )}
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'text-sm font-medium text-surface/95 transition-colors duration-200 hover:text-white',
                  isActive
                    ? 'underline decoration-white decoration-1 underline-offset-[6px]'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button variant="primary" onClick={onDownloadApp}>
            Download App
          </Button>
        </div>

        <button
          type="button"
          className="relative z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface/40 text-surface lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={[
                'block h-0.5 w-5 bg-current transition-transform duration-300',
                menuOpen ? 'translate-y-[7px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-5 bg-current transition-opacity duration-300',
                menuOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-5 bg-current transition-transform duration-300',
                menuOpen ? '-translate-y-[7px] -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-20 border-t border-white/10 bg-black/85 px-5 py-6 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto flex max-w-site flex-col gap-4" aria-label="Mobile">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'py-1 text-base font-medium text-surface',
                      isActive
                        ? 'underline decoration-white decoration-1 underline-offset-[6px]'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                variant="primary"
                fullWidth
                className="mt-2"
                onClick={() => {
                  setMenuOpen(false);
                  onDownloadApp?.();
                }}
              >
                Download App
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
