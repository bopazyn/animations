import {createFileRoute, Link} from '@tanstack/react-router'
import styles from "#/components/Home/Home.module.css";

const ENTRIES = [
  {to: '/circle-packing', label: 'CIRCLE PACKING', dot: '◉'},
  {to: '/look-at-me', label: 'LOOK AT ME', dot: '●'},
  {to: '/logo-drops', label: 'LOGO DROPS', dot: '◎'},
] as const;

const Home = () => (
  <div className={styles.page}>
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerDot}>◈</span>
        <span className={styles.headerTitle}>ANIMATIONS</span>
      </div>
      <nav className={styles.list}>
        {ENTRIES.map(({to, label, dot}) => (
          <Link key={to} to={to} className={styles.entry}>
            <span className={styles.entryDot}>{dot}</span>
            <span className={styles.entryLabel}>{label}</span>
            <span className={styles.entryArrow}>→</span>
          </Link>
        ))}
      </nav>
    </div>
  </div>
);

export const Route = createFileRoute('/')({component: Home})
