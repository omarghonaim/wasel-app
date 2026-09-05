import { motion, useReducedMotion } from 'framer-motion';
import { ProcessStep } from './ProcessStep';
import styles from './WaselWorksSection.module.css';

const ASSET = '/assets/landing/img/react_assets/product-service';

const STEPS = [
  {
    id: 'browse',
    icon: `${ASSET}/icons/search.svg`,
    title: 'Browse',
    description: 'Explore products from local shops.',
  },
  {
    id: 'order',
    icon: `${ASSET}/icons/order.svg`,
    title: 'Order',
    description: 'Add items and place your order securely.',
  },
  {
    id: 'driver',
    icon: `${ASSET}/icons/driver.svg`,
    title: 'Driver',
    description: 'Your order is picked up by our professional fleet.',
  },
  {
    id: 'delivered',
    icon: `${ASSET}/icons/delivered.svg`,
    title: 'Delivered',
    description: 'Enjoy your delivery at your doorstep.',
  },
] as const;

export function HowWaselWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.process}>
      <div className={styles.processInner}>
        <motion.header
          className={styles.processHeader}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.processHeading}>How Wasel Works?</h2>
          <p className={styles.processSubtitle}>
            From craving to doorstep in just a few taps.
          </p>
        </motion.header>

        <div className={styles.stepsWrap}>
          {/* Desktop horizontal connector — unchanged */}
          <img
            src={`${ASSET}/process-connector.svg`}
            alt=""
            className={styles.connector}
            width={948}
            height={42}
            aria-hidden="true"
          />

          {/* Mobile vertical timeline — hidden from md+ */}
          <svg
            className={styles.mobileTimeline}
            width="22"
            height="380"
            viewBox="0 0 22 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              opacity="0.3"
              d="M0.986088 0.166503C22.3249 126.495 26.5883 252.823 13.7762 379.152"
              stroke="#740D20"
              strokeWidth="2"
              strokeDasharray="11 11"
            />
          </svg>

          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <ProcessStep
                key={step.id}
                icon={step.icon}
                title={step.title}
                description={step.description}
                iconClassName={
                  step.id === 'driver' ? styles.stepIconDriver : undefined
                }
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
