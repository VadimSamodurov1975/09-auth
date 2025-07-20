"use client";

import css from "./SignInPage.module.css";
import { useRouter } from "next/router";
import { LoginRequest, login } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    try {
      const info = Object.fromEntries(formData) as LoginRequest;
      const res = await login(info);
      if (res) {
        setUser(res);
        router.push("/proile");
      }
    } catch (error) {
      console.log(error);
      setError(`{error.message}`);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default Login;