"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="operator-login-form">
      <div className="operator-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus />
      </div>
      <div className="operator-field">
        <label htmlFor="password">Password</label>
        <div className="operator-password">
          <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" minLength={8} required />
          <button type="button" onClick={() => setShowPassword((value) => !value)} aria-pressed={showPassword}>
            {showPassword ? "Sembunyikan" : "Lihat"}
          </button>
        </div>
      </div>
      {state?.error && <p className="operator-error" role="alert">{state.error}</p>}
      <button className="operator-primary-button" type="submit" disabled={pending}>
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
