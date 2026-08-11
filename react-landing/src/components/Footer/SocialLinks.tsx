import { memo, useMemo } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export type SocialLinksConfig = {
  twitter?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  instagram?: string | null;
};

type SocialItem = {
  id: string;
  label: string;
  href: string;
  Icon: IconType;
};

type SocialLinksProps = {
  links?: SocialLinksConfig;
  className?: string;
};

const iconClass = 'h-[1.05rem] w-[1.05rem] sm:h-[1.1rem] sm:w-[1.1rem]';

export const SocialLinks = memo(function SocialLinks({
  links = {},
  className = '',
}: SocialLinksProps) {
  const items = useMemo<SocialItem[]>(
    () => [
      { id: 'twitter', label: 'X (Twitter)', href: links.twitter ?? '#', Icon: FaXTwitter },
      { id: 'facebook', label: 'Facebook', href: links.facebook ?? '#', Icon: FaFacebookF },
      { id: 'youtube', label: 'YouTube', href: links.youtube ?? '#', Icon: FaYoutube },
      { id: 'instagram', label: 'Instagram', href: links.instagram ?? '#', Icon: FaInstagram },
    ],
    [links.facebook, links.instagram, links.twitter, links.youtube],
  );

  return (
    <ul
      className={['flex items-center justify-center gap-5 sm:justify-start sm:gap-6', className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Social media"
    >
      {items.map(({ id, label, href, Icon }) => {
        const isExternal = href !== '#';

        return (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex text-white transition-[color,transform] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:text-[#580C1A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              onClick={isExternal ? undefined : (event) => event.preventDefault()}
            >
              <Icon className={iconClass} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
});
