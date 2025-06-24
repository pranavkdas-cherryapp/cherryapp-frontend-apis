import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function SinglePageDeeplinks({
  deeplinkParams,
  setDeeplinkParams,
  path,
}: {
  deeplinkParams: { path: string; params: any };
  setDeeplinkParams: ({ path, params }: { path: string; params: any }) => void;
  path: string;
}) {
  useEffect(() => {
    setDeeplinkParams({
      path: path,
      params: {},
    });
  }, [path]);

  return null;
}
