import { memo } from 'react';

export type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterLinksProps = {
  title: string;
  links: readonly FooterLinkItem[];
  className?: string;
  align?: 'start' | 'center';
};

const linkClass =
  'text-sm text-white/55 transition-colors duration-300 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70';

export const FooterLinks = memo(function FooterLinks({
  title,
  links,
  className = '',
  align = 'start',
}: FooterLinksProps) {
  return (
    <nav className={className} aria-label={title}>
      <h3
        className={[
          'font-display text-sm font-semibold text-white sm:text-[0.95rem]',
          align === 'center' ? 'text-center' : 'text-left',
        ].join(' ')}
      >
        {title}
      </h3>
      <ul
        className={[
          'mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-3.5',
          align === 'center' ? 'items-center text-center' : 'items-start text-left',
        ].join(' ')}
      >
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export const COMPANY_LINKS: readonly FooterLinkItem[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Careers', href: '#careers' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
] as const;

export const IMPORTANT_LINKS: readonly FooterLinkItem[] = [
  { label: 'Partner with Us', href: '#join-us' },
  { label: 'Become a Driver', href: '#join-us' },
] as const;

export const LEGAL_LINKS: readonly FooterLinkItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-and-conditions' },
  { label: 'Cookies', href: '#cookies' },
] as const;
