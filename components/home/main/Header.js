import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link legacyBehavior href=''>
            Store
          </Link>
        </li>
        <li>
          <Link legacyBehavior href=''>
            Electronics
          </Link>
        </li>
        <li>
          <Link legacyBehavior href=''>
            Watches
          </Link>
        </li>
      </ul>
    </div>
  );
}
