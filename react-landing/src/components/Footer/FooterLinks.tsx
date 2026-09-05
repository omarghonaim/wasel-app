import { memo } from 'react';

export type FooterLinkItem = {
  label: string;
  href: string;
  /** Hide this link below the md breakpoint (mobile footer). */
  hideOnMobile?: boolean;
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
          'mt-2.5 flex flex-col gap-2 md:mt-5 md:gap-3.5',
          align === 'center' ? 'items-center text-center' : 'items-start text-left',
        ].join(' ')}
      >
        {links.map((link) => (
          <li
            key={link.href + link.label}
            className={link.hideOnMobile ? 'max-md:hidden' : undefined}
          >
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
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/#careers' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contact-us', hideOnMobile: true },
] as const;

/** Partner column links (mobile design reference). */
export const PARTNER_LINKS: readonly FooterLinkItem[] = [
  { label: 'Become a Driver', href: '/#join-us' },
  { label: 'Vendor Login', href: '/login/vendor' },
] as const;

/** Alias kept for any existing imports. */
export const IMPORTANT_LINKS = PARTNER_LINKS;

export const LEGAL_LINKS: readonly FooterLinkItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-and-conditions' },
  { label: 'Cookies', href: '/#cookies' },
] as const;
