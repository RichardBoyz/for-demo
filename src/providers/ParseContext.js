// components/ParseProvider.js
"use client";

import Parse from "parse";
import { createContext, useContext, useEffect, useState } from "react";

// 建立一個 Context，用於檢查 Parse 是否已準備好
const ParseContext = createContext();

export function ParseProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchSecret = async () => {
      const res = await fetch("/api/get-secret");
      const data = await res.json();
      const { jsKey, applicationId, serverUrl } = data;
      if (!applicationId || !jsKey || !serverUrl) {
        console.error("Parse 公開環境變數遺失，無法初始化。");
        return;
      }

      // 執行 Parse 的客戶端初始化
      Parse.initialize(applicationId, jsKey);
      Parse.serverURL = serverUrl;
      setIsInitialized(true);
    };
    fetchSecret();

    // 讀取帶有 NEXT_PUBLIC_ 前綴的公開環境變數
    // const applicationId = process.env.NEXT_PUBLIC_APPLICATION_ID;
    // const jsKey = process.env.NEXT_PUBLIC_JS_KEY;
    // const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    // 檢查所有必要的公開變數是否都存在
    // if (!applicationId || !jsKey || !serverUrl) {
    //   console.error("Parse 公開環境變數遺失，無法初始化。");
    //   return;
    // }

    // // 執行 Parse 的客戶端初始化
    // Parse.initialize(applicationId, jsKey);
    // Parse.serverURL = serverUrl;
    // setIsInitialized(true);
  }, []); // 空陣列確保只在客戶端載入時執行一次

  if (!isInitialized) return <div>Loading...</div>;

  // 將初始化狀態提供給子元件
  return (
    <ParseContext.Provider value={{ isInitialized }}>
      {children}
    </ParseContext.Provider>
  );
}

// 建立一個自訂 Hook，方便子元件使用
export function useParseClient() {
  const context = useContext(ParseContext);
  if (context === undefined) {
    throw new Error("useParseClient 必須在 ParseProvider 內部使用");
  }
  return context;
}
