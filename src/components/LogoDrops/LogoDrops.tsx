import {AnimationCard} from '#/components/AnimationCard/AnimationCard';
import styles from './LogoDrops.module.css';

const LogoMark = () => (
  <svg className={styles.logo} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7L33 30H7L20 7Z" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round"/>
    <line x1="13.5" y1="22" x2="26.5" y2="22" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const LogoDrops = () => (
  <AnimationCard dot="◎" title="LOGO DROPS">
    <div className={styles.body}>
      <div className={styles.loader}>
        <div className={styles.pulse} />
        <div className={styles.pulse} />
        <div className={styles.pulse} />
        <LogoMark />
      </div>
    </div>
  </AnimationCard>
);
