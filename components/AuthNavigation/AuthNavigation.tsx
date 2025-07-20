"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";

const AuthNavigation = () => {
  const { isAuth, user, clearAuth } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    clearAuth();
    router.replace("sign-in");
  };

  return isAuth ? (
    <div>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogOut} className={css.logoutButton}>
          Logout
        </button>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </div>
  ) : null;
};

export default AuthNavigation;