import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import styles from './ContactInformationSection.module.css';

type InfoCard = {
  title: string;
  lines: [string, string];
  Icon: IconType;
};

const CARDS: InfoCard[] = [
  {
    title: 'Visit Us',
    lines: ['Doha Tower, Floor 15', 'West Bay, Doha, Qatar'],
    Icon: LuMapPin,
  },
  {
    title: 'Call Us',
    lines: ['+974 4444 8888', 'Sun-Thu: 8am - 10pm'],
    Icon: LuPhone,
  },
  {
    title: 'Email Us',
    lines: ['support@wasel.qa', 'partners@wasel.qa'],
    Icon: LuMail,
  },
];

export function ContactInformationSection() {
  return (
    <section className={styles.section} aria-label="Contact information">
      <div className={styles.container}>
        {CARDS.map(({ title, lines, Icon }) => (
          <article key={title} className={styles.card}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.detail}>
              {lines[0]}
              <br />
              {lines[1]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
