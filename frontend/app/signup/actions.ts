
'use server';

import * as z from 'zod';
import { formSchema } from '@/components/common/auth-form';

interface SignupResult {
  success?: string;
  error?: string;
}

export async function signup(values: z.infer<typeof formSchema>): Promise<SignupResult> {
  try {
    const response = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse error JSON:', jsonError);
        return { error: 'An unexpected error occurred (failed to parse error response)' };
      }
      return {
        error: errorData.detail || 'Signup failed',
      };
    }

    // Assuming a successful signup response doesn't return a body, or an empty one
    // If your backend returns a success message, you can parse it here
    return {
      success: 'Signup successful!',
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: 'An unexpected error occurred',
    };
  }
}
