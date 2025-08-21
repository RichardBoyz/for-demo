import Parse from "parse";

// 處理登入
export const handleLogin = async (email, password) => {
  try {
    const user = await Parse.User.logIn(email, password);
    localStorage.setItem("sessionToken", user.getSessionToken());
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("登入失敗，請檢查信箱或密碼。");
  }
};

// 處理註冊
export const handleRegistration = async (email, password, displayName) => {
  try {
    const user = new Parse.User();

    user.set("username", email);
    user.set("password", password);
    user.set("email", email);
    user.set("displayName", displayName);

    await user.signUp();
    localStorage.setItem("sessionToken", "");
    localStorage.setItem("sessionToken", user.getSessionToken());
    return user;
  } catch (error) {
    console.error("註冊失敗:", error);
    if (error.code === 203) {
      throw new Error("信箱已被註冊。");
    } else {
      throw new Error("註冊失敗，請稍後再試。");
    }
  }
};

// 處理登出
export const handleLogout = async () => {
  try {
    await Parse.User.logOut();

    localStorage.removeItem("sessionToken");

    return true;
  } catch (error) {
    console.error("登出失敗:", error);
    throw new Error("登出失敗，請稍後再試。");
  }
};

// 處理密碼重設
export const handlePasswordReset = async (email) => {
  try {
    if (!email) {
      throw new Error("請輸入信箱。");
    }

    await Parse.User.requestPasswordReset(email);

    return "密碼重設郵件已發送，請檢查您的信箱。";
  } catch (error) {
    console.error("密碼重設失敗:", error);
    if (error.code === 205) {
      throw new Error("找不到該信箱的使用者。");
    } else {
      throw new Error("密碼重設失敗，請稍後再試。");
    }
  }
};

// 檢查並恢復使用者狀態
export const handleRestoreSession = async () => {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
    return null; // 沒有 Token，返回 null
  }

  try {
    // 使用 Parse SDK 的 become 方法恢復使用者
    const user = await Parse.User.become(sessionToken);

    // 如果 token 有效，返回使用者物件
    return user;
  } catch (error) {
    // 如果 token 無效或過期，清除它
    console.error("Session token is invalid or expired. Cleaning up.");
    localStorage.removeItem("sessionToken");
    return null;
  }
};
