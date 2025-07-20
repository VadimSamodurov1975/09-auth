"use client";

import css from "../ProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";

const ProfileEdit = () => {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  if (!user) return null;

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <form className={css.profileInfo}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" className={css.input} />
        </div>

        <p>Email: {user.email}</p>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;