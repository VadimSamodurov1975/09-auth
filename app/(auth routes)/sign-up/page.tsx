"use client";

import css from "./SignUpPage.module.css";
import { useRouter } from "next/router";
import { RegisterRequest, register } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleRegister = async (formData: FormData) => {
    try {
      const info = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(info);
      if (res) {
        setUser(res);
        router.push("/proile");
      }
    } catch {
      console.log("error", error);
      setError(`{error.message}`);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleRegister} className={css.form}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default Register;