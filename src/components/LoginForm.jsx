"use client";

import useNavigate from "@/hooks/useNavigate";
import { AuthContext } from "@/providers/AuthContext";
import { useContext, useState } from "react";

const LoginForm = ({ handleCloseNav = () => {}, onClose = () => {} }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { navigateTo } = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      onClose();
      handleCloseNav();
      navigateTo("/travel-spot");
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
          <div className="dark:text-white">密碼</div>
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className="py-2 rounded-lg border-solid border-[1px] border-blue-950 dark:bg-gray-800"
          type="submit"
        >
          登入
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
