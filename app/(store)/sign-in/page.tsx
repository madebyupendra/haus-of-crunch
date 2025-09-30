"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function sanitizeReturnTo(input: string | null): string | undefined {
  if (!input) return undefined;
  try {
    // Prevent open redirects: allow only same-origin relative paths
    const url = new URL(input, "http://localhost");
    const candidate = url.pathname + (url.search || "") + (url.hash || "");
    if (!candidate.startsWith("/")) return undefined;
    // Disallow navigating to auth pages again
    if (candidate.startsWith("/sign-in") || candidate.startsWith("/sign-up")) {
      return "/";
    }
    return candidate;
  } catch {
    return undefined;
  }
}

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const returnTo = useMemo(() => {
    const raw = searchParams.get("returnTo") || searchParams.get("redirect_url");
    return sanitizeReturnTo(raw) || "/";
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <SignIn forceRedirectUrl={returnTo} fallbackRedirectUrl={returnTo} routing="hash" />
    </div>
  );
}


