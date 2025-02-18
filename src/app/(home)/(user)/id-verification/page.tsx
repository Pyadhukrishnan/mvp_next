import React from 'react';
import styles from './id-verifiocation.module.css'
import IdVerification from '@/modules/id-verification/views/id-verification';

export default function page() {
  return (
    <div className={styles.pageWrapper}>
      <IdVerification />
    </div>
  )
}
