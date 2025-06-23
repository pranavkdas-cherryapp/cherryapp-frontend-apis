import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function HowItWorksDeeplink({
  deeplinkParams,
  setDeeplinkParams,
}: {
  deeplinkParams: { path: string; params: any };
  setDeeplinkParams: ({ path, params }: { path: string; params: any }) => void;
}) {
  useEffect(() => {
    setDeeplinkParams({
      path: "home/how-it-works/intro",
      params: {},
    });
  }, []);

  return null;
}
