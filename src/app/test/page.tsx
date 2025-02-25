"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import the hook
import styles from './test.module.css';

export default function Page() {
  const searchParams = useSearchParams(); // Get query parameters
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('access_token'); // Get 'access_token' from URL
    setAccessToken(token);
  }, [searchParams]);

  return (
    <div className={styles.pageContainer}>
      <h2>This will be the table template</h2>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>No access token found.</p>
      )}
    </div>
  );
}
