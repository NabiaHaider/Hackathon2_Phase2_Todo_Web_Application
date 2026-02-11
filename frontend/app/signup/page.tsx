'use client';

import { AuthForm } from '@/components/common/auth-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { formSchema } from '@/components/common/auth-form';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        
        const errorMsg = (data.detail || '').toLowerCase();
        if (errorMsg.includes('already registered') ||
            errorMsg.includes('email already') ||
            errorMsg.includes('exists') ||
            errorMsg.includes('duplicate')) {
          
          
          alert('Email already registered! Redirecting to login page...');
          
          setTimeout(() => {
            router.push('/login');
            router.refresh();
          }, 1500); // 1.5 second wait taake alert dikhe
        } else {
          // Dusre errors ke liye page pe hi error dikhao
          setError(data.detail || 'Signup failed. Please try again.');
        }
        return;
      }

      alert('✅ Signup successful! Your account has been created. Redirecting to login...');

      // 2 second wait karke login page pe jao
      setTimeout(() => {
        router.push('/login');
        router.refresh();
      }, 2000);

    } catch (e: any) {
      console.error('Signup error:', e);
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_12px_30px_rgba(255,192,203,0.45)] p-8 transition-transform duration-500 hover:scale-105">

        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto h-12 w-12 rounded-full shadow-lg"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join us and start your journey 
          </p>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-inner">
          <AuthForm
            type="signup"
            onSubmit={handleSignup}
            isLoading={isLoading}
            error={error}
            inputClassName="bg-pink-50 text-black placeholder:text-primary focus:border-purple-200 focus:ring-purple-200"
            labelClassName="block text-sm font-medium text-primary mb-1"
          />
        </div>

        <div className="mt-6 text-center bg-purple-100 rounded-xl p-6 shadow-inner">
          <p className="text-sm text-primary">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:text-purple-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
