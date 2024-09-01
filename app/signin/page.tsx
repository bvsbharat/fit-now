'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google', { callbackUrl: '/fitness-questionnaire' })}>
        Sign in with Google
      </button>
    </div>
  );
}