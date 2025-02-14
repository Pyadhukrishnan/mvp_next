import AdditionalInfo from '@/modules/additional-info/views/additional-info';
import styles from './additional-info-page.module.css';
import React from 'react';

export default function AdditionalInfoPage() {
  return (
    <div className={styles.pageWrapper}>
      <AdditionalInfo />
    </div>
  )
}
