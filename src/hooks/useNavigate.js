"use client";

import { useRouter } from "next/navigation";

export default function useNavigate() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const goBack = () => {
    router.back();
  };

  return { navigateTo, goBack };
}
