import {Link} from '@tanstack/react-router';
import type {ReactNode} from 'react';
import styles from './AnimationCard.module.css';

interface AnimationCardProps {
  dot: string;
  title: string;
  children: ReactNode;
}

export const AnimationCard = ({dot, title, children}: AnimationCardProps) => (
  <div className={styles.page}>
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerDot}>{dot}</span>
        <span className={styles.headerTitle}>{title}</span>
        <Link to="/" className={styles.back}>← BACK</Link>
      </div>
      {children}
    </div>
  </div>
);
