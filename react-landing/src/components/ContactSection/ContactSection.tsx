import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ApiRequestError } from '@/api/client';
import { sendContactMessage } from '@/api/contact';
import { ContactMap } from './ContactMap';
import styles from './ContactSection.module.css';

const QATAR_DIAL = '+974';
const LOCAL_PHONE_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_TITLE = 'Your message has been sent successfully.';
const SUCCESS_SUBTITLE = "We'll get back to you soon.";

type FormValues = {
  name: string;
  email: string;
  localPhone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: '',
  email: '',
  localPhone: '',
  message: '',
};

function QatarFlag() {
  return (
    <svg
      className={styles.flag}
      viewBox="0 0 21 14"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="21" height="14" fill="#8A1538" />
      <path
        fill="#fff"
        d="M0 0h7.2L9 1.4 7.2 2.8 9 4.2 7.2 5.6 9 7 7.2 8.4 9 9.8 7.2 11.2 9 12.6 7.2 14H0z"
      />
    </svg>
  );
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const localPhone = digitsOnly(values.localPhone);

  if (!name) {
    errors.name = 'Full name is required.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!localPhone) {
    errors.localPhone = 'Phone number is required.';
  } else if (localPhone.length !== LOCAL_PHONE_LENGTH) {
    errors.localPhone = 'Enter an 8-digit Qatar phone number.';
  }

  if (!message) {
    errors.message = 'Message is required.';
  }

  return errors;
}

type ContactSectionProps = {
  mapApiKey: string | null;
};

export function ContactSection({ mapApiKey }: ContactSectionProps) {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleTextChange = (field: 'name' | 'email' | 'message') => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess(false);
    setFormError(null);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = digitsOnly(event.target.value).slice(0, LOCAL_PHONE_LENGTH);
    setValues((current) => ({ ...current, localPhone: next }));
    setErrors((current) => ({ ...current, localPhone: undefined }));
    setSuccess(false);
    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSuccess(false);
    setFormError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: `${QATAR_DIAL}${digitsOnly(values.localPhone)}`,
        message: values.message.trim(),
      });
      setValues(EMPTY_VALUES);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        const fieldErrors: FormErrors = {};
        error.errors?.forEach((item) => {
          if (item.code === 'name') fieldErrors.name = item.message;
          if (item.code === 'email') fieldErrors.email = item.message;
          if (item.code === 'phone') fieldErrors.localPhone = item.message;
          if (item.code === 'message') fieldErrors.message = item.message;
        });
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        }
        setFormError(error.message);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <ContactMap apiKey={mapApiKey} />
      <div className={styles.mapVeil} />

      <div className={styles.content}>
        <motion.div
          className={styles.card}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Send a Message</p>
          <h1 id="contact-heading" className={styles.heading}>
            How can we help?
          </h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  className={[styles.input, errors.name ? styles.inputError : '']
                    .filter(Boolean)
                    .join(' ')}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleTextChange('name')}
                />
                {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  className={[styles.input, errors.email ? styles.inputError : '']
                    .filter(Boolean)
                    .join(' ')}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@email.com"
                  value={values.email}
                  onChange={handleTextChange('email')}
                />
                {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-phone">
                Phone Number
              </label>
              <div
                className={[styles.phoneControl, errors.localPhone ? styles.inputError : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className={styles.phonePrefix} aria-hidden="true">
                  <QatarFlag />
                  <span className={styles.dialCode}>{QATAR_DIAL}</span>
                </div>
                <input
                  id="contact-phone"
                  className={styles.phoneInput}
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="0000000"
                  value={values.localPhone}
                  onChange={handlePhoneChange}
                  aria-label="Qatar phone number"
                />
              </div>
              {errors.localPhone ? <p className={styles.error}>{errors.localPhone}</p> : null}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className={[styles.textarea, errors.message ? styles.inputError : '']
                  .filter(Boolean)
                  .join(' ')}
                name="message"
                placeholder="Tell us more about your inquiry..."
                value={values.message}
                onChange={handleTextChange('message')}
              />
              {errors.message ? <p className={styles.error}>{errors.message}</p> : null}
            </div>

            <button className={styles.submit} type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {success ? (
              <div className={[styles.status, styles.statusSuccess].join(' ')} role="status">
                <p>{SUCCESS_TITLE}</p>
                <p>{SUCCESS_SUBTITLE}</p>
              </div>
            ) : null}
            {formError && !success ? (
              <p className={[styles.status, styles.statusError].join(' ')} role="alert">
                {formError}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
