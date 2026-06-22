"use client";

import { useActionState } from "react";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-gold" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta)]">
            Elfakal Admin
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to manage content and inquiries
          </p>
        </div>

        <form action={formAction} className="bg-white rounded-2xl p-8 shadow-2xl space-y-6">
          {state?.error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              <AlertCircle size={16} className="shrink-0" />
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue-light transition-colors disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
