"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function StringInputWithChips({
  values,
  setValues,
  paramKey,
  inputValue,
  setInputValue,
}: {
  values: { path: string; params: any };
  setValues: ({ path, params }: { path: string; params: any }) => void;
  paramKey: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newValue = inputValue.trim();
      if (!values.params?.[paramKey]?.includes(newValue)) {
        setValues({
          path: values.path,
          params: {
            ...values.params,
            [paramKey]: [...(values.params?.[paramKey] ?? []), newValue],
          },
        });
      }
      setInputValue("");
    }
  };

  const removeValue = (val: string) => {
    setValues({
      path: values.path,
      params: {
        ...values.params,
        [paramKey]: (values.params?.[paramKey] ?? []).filter(
          (v: string) => v !== val
        ),
      },
    });
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      <Input
        placeholder="Type and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2">
        {values.params[paramKey].map((val: string) => (
          <Badge
            key={val}
            variant="secondary"
            className="flex items-center gap-1 pr-2"
          >
            <span>{val}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeValue(val);
              }}
              className="ml-1 rounded-full p-1 hover:bg-gray-200"
            >
              <X className="h-3 w-3 text-muted-foreground " />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
