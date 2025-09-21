'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import Head from 'next/head';
import { login } from '@/services/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // Import icons

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Login - Finex360</title>
        <meta name="description" content="Login to Finex360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl shadow-lg">
        {/* Left Section - Welcome */}
        <div className="relative hidden w-1/2 items-center justify-center bg-[#175eac] p-8 text-white md:flex">
          <div className="z-10 text-center">
            <h2 className="mb-4 text-4xl font-bold">WELCOME</h2>
            {/* <h3 className="mb-4 text-2xl font-semibold">YOUR HEADLINE NAME</h3> */}
            <p className="text-sm leading-relaxed">
              
            </p>
          </div>
          {/* Abstract shapes/patterns - simplified */}
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#2a70bd] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-[#2a70bd] opacity-20"></div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="w-full bg-white p-8 md:w-1/2">
          <h2 className="mb-2 text-3xl font-bold text-gray-800 text-center">Sign in</h2>
          <p className="mb-6 text-sm text-gray-600"></p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">User Name</label>
              <input
                type="text"
                id="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#175eac] focus:ring-[#175eac] text-gray-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} // Dynamic type
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#175eac] focus:ring-[#175eac] text-gray-800"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Add onClick handler
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-semibold text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" /> // Closed eye icon
                  ) : (
                    <EyeIcon className="h-5 w-5" /> // Open eye icon
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-[#175eac]" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-[#175eac] hover:underline">Forgot Password?</a>
            </div>

            {error && <p className="mb-4 text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#175eac] p-3 text-lg font-semibold text-white hover:bg-[#144a8a] disabled:bg-[#4d82c2]"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">Don&apos;t have an account? <a href="#" className="text-[#175eac] hover:underline">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
