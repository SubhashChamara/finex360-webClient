'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/home'); // Use replace to avoid adding to history
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null; // This component doesn't render anything
};

export default AuthRedirect;
