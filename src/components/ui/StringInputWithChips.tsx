"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function StringInputWithChips({
  values,
  setValues,
}: {
  values: string[];
  setValues: (values: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newValue = inputValue.trim();
      if (!values.includes(newValue)) {
        setValues((prev) => [...prev, newValue]);
      }
      setInputValue("");
    }
  };

  const removeValue = (val: string) => {
    setValues((prev) => prev.filter((v) => v !== val));
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
        {values.map((val) => (
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
