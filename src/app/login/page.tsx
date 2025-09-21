'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import Head from 'next/head';
import { login } from '@/services/auth';

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(username, password);
      if (data && data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        router.push('/home');
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      setError('Invalid username or password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Login - Finex360</title>
        <meta name="description" content="Login to Finex360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Finex360</h1>
          <p className="mb-8 text-gray-600">Welcome back! Please log in to your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3"
              />
            </div>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
