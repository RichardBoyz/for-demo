import Parse from "parse";

// 信箱登入
export const loginWithEmail = async (email, password) => {
  try {
    const user = await Parse.User.logIn(email, password);
    return user;
  } catch (error) {
    throw new Error("登入失敗，請檢查信箱或密碼。");
  }
};

// 使用者註冊
export const registerWithEmail = async (email, password) => {
  try {
    const user = new Parse.User();
    user.set("username", email); // 通常信箱會作為使用者名稱
    user.set("password", password);
    user.set("email", email);

    await user.signUp();
    return user;
  } catch (error) {
    throw new Error("註冊失敗，請稍後再試。");
  }
};
