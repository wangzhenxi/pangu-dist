
import React from 'react';
import { Link } from 'ice';
import styles from './index.module.scss';

export default function Logo({ text, url }) {
  return (
    <div className="logo">
      <Link to={url || '/'} className={styles.logo}>
        <span>{text}</span>
      </Link>
    </div>
  );
}
    