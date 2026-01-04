"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function SignInPage() {
  const [googleAvailable, setGoogleAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/providers")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setGoogleAvailable(Boolean(data && data.google));
      })
      .catch(() => {
        if (!mounted) return;
        setGoogleAvailable(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to LMS — Sign in</h1>

        <button
          className="google-btn"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          aria-label="Sign in with Google"
          disabled={googleAvailable === false}
          title={
            googleAvailable === false
              ? "Google provider is not configured. See README.md"
              : undefined
          }
        >
          <svg
            className="google-logo"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fill="#EA4335"
              d="M12 11.1v2.8h3.9c-.17 1.02-.98 2.99-3.9 4.02-2.35.88-6.3.68-8.64-.9C1.9 15.5 1.4 9.7 3.9 6.9 6.1 4.4 9.8 3.7 12 5.1c1.07.76 1.73 1.96 1.84 3.36H12z"
            />
            <path
              fill="#34A853"
              d="M3.9 17.1c1.84 1.86 5.2 2.63 7.6 1.7 2.92-1.04 3.73-3 3.9-4.02H12v-2.8h9.1C21.1 14.3 17.8 19 12 19c-1.5 0-2.9-.2-4.1-.5z"
            />
            <path
              fill="#FBBC05"
              d="M12 5.1c1.1 0 2.2.4 3 1.02l2.2-2.2C16.4 2.4 14.3 1.7 12 1.7 7.3 1.7 3.9 6.4 3.9 11.3c0 .1 0 .2 0 .3l2.1-.9c.1-2.1 1.3-3.9 5-4.6z"
            />
            <path
              fill="#4285F4"
              d="M22.2 7.6c.2.9.3 1.8.3 3.1 0 1.3-.1 2.2-.3 3.1h-9.9v-2.8h6.1c-.2-1-.9-2-2-2.6-1.1-.7-2.4-.6-3.3-.6-.8 0-1.6.2-2.3.5 0 0 0 0 0L7.8 4.2C9.9 3 11.9 2.7 12 2.7 16.6 2.7 20 7.3 22.2 7.6z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <div className="secondary">
          {googleAvailable === null && "Checking sign-in providers..."}
          {googleAvailable === false && (
            <>
              Google sign-in is not configured. Create `.env.local` from
              `/.env.example` and set `GOOGLE_CLIENT_ID`,
              `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET`. See the project's
              README.
            </>
          )}
          {googleAvailable === true &&
            "You can use your Google account to sign up or sign in."}
        </div>
      </div>
    </div>
  );
}
