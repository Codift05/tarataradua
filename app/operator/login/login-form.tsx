"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="operator-login-form">
      <div className="operator-field">
        <label htmlFor="email">Email operator</label>
        <input id="email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="operator-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" minLength={8} required />
      </div>
      {state?.error && <p className="operator-error" role="alert">{state.error}</p>}
      <button className="operator-primary-button" type="submit" disabled={pending}>
        {pending ? "Memeriksa…" : "Masuk ke dashboard"}
      </button>
    </form>
  );
}
