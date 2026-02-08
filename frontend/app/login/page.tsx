
'use client';

import { AuthForm } from '@/components/common/auth-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { formSchema } from '@/components/common/auth-form';


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

      const handleLogin = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            setError(data.detail || 'Login failed');
            setIsLoading(false);
            return;
          }
  
          // Store JWT token in localStorage
          localStorage.setItem('jwt_token', data.access_token);
  
          // Redirect to tasks page
          router.push('/tasks');
        } catch (e: any) {
          setError(e.message || 'An unexpected error occurred.');
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 ">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_10px_25px_rgba(255,192,203,0.5)] p-8 transform transition duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <img
            src="/logo.png" 
            alt="Logo"
            className="mx-auto h-12 w-12 rounded-full shadow-lg"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Login to your account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-inner text-primary">
            {/* Pass input color props to AuthForm */}
            <AuthForm 
              type="login" 
              onSubmit={handleLogin} 
              isLoading={isLoading} 
              error={error} 
              inputClassName="bg-purple-600 text-black placeholder-purple-200 focus:ring-purple-200 focus:border-purple-200"
            />
          </div>
        </div>

        <div className="mt-6 text-center bg-purple-100 rounded-xl p-6 shadow-inner">
          <p className="text-sm text-primary">
            Don’t have an account?{' '}
            <a href="/signup" className="font-medium text-primary hover:text-purple-900">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}   