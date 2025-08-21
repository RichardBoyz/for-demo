"use client";

import { handleRegistration } from "@/services/auth";
import { useState } from "react";

const SignUpForm = ({ onClose = () => {} }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("密碼與確認密碼不一致");
      return;
    }

    if (!displayName.trim()) {
      setError("暱稱不能為空白");
      return;
    }

    try {
      await handleRegistration(email, password, displayName);
      onClose();
      // 可導向登入頁或主頁
    } catch (err) {
      setError(err.message);
    }
  };

  const inputClass = "outline-none h-10 px-2 text-black";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1 justify-evenly h-full gap-6"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="dark:text-white">信箱</div>
          <input
            type="email"
            placeholder="信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="dark:text-white">暱稱</div>
          <input
            type="text"
            placeholder="暱稱"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="dark:text-white">密碼</div>
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="dark:text-white">確認密碼</div>
          <input
            type="password"
            placeholder="確認密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className="py-2 rounded-lg border-solid border-[1px] border-blue-950 dark:bg-gray-800"
          type="submit"
        >
          註冊
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default SignUpForm;
