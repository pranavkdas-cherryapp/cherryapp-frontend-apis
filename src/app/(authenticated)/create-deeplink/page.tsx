"use client";

import { Button } from "@/components/ui/button";

import { useAuth, withAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchDeeplink } from "@/components/create-deeplink/SearchDeeplink";
import { Textarea } from "@/components/ui/textarea";
import qs from "qs";

function CreateDeeplinkPage() {
  const [baseUrl, setBaseUrl] = useState("https://creators.cherryapp.in/");
  const [deeplinkParams, setDeeplinkParams] = useState<{
    path: string;
    params: any;
  }>({ path: "", params: {} });
  const [deeplinkPreview, setDeeplinkPreview] = useState<string>("");

  const [selectedDeeplinkType, setSelectedDeeplinkType] = useState<
    string | undefined
  >(undefined);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deeplinkPreview);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const generateDeeplink = () => {
    const path = deeplinkParams.path;
    const params = deeplinkParams.params;
    if (path === "") {
      return;
    }
    const deeplink = `${baseUrl}${path}?${qs.stringify(params)}`;
    setDeeplinkPreview(deeplink);
  };

  const renderDeeplinkComponent = {
    search: (
      <SearchDeeplink
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
      />
    ),
  };

  return (
    <div className="min-h-screen w-full bg-white px-8 py-6">
      <div className="flex gap-8">
        {/* LEFT: Form */}
        <div className="w-1/2 space-y-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Deeplink
            </h1>
          </div>

          <div className="mt-8 space-y-2 max-w-[375px]">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              required
              disabled
            />
          </div>

          <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
            <Label htmlFor="deeplinkType">Select deeplink type</Label>
            <Select
              value={selectedDeeplinkType}
              onValueChange={setSelectedDeeplinkType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search</SelectItem>
                {/* Add more options here */}
              </SelectContent>
            </Select>
          </div>

          {selectedDeeplinkType &&
            renderDeeplinkComponent[
              selectedDeeplinkType as keyof typeof renderDeeplinkComponent
            ]}
        </div>

        {/* RIGHT: Text Area */}
        <div className="w-1/2 space-y-4 min-w-[450px] max-w-[450px]">
          <div>
            <Label htmlFor="preview" className="block mb-2">
              Output / Preview
            </Label>
            <Textarea
              id="preview"
              className="w-full h-full min-h-[300px] max-h-[300px] resize-none rounded-md border border-gray-300 p-4 text-sm text-gray-800 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Deeplink or JSON preview will appear here..."
              value={deeplinkPreview}
              readOnly={true}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              onClick={generateDeeplink}
              className="w-1/2"
              variant="default"
              size="sm"
            >
              Generate deeplink
            </Button>
            <Button
              onClick={handleCopy}
              className="w-1/2"
              variant="outline"
              size="sm"
            >
              Copy
            </Button>
          </div>
          <Button
            onClick={() => {
              console.log(deeplinkParams);
              let params = Object.fromEntries(
                Object.entries(deeplinkParams.params).map(([key, value]) => {
                  if (Array.isArray(value)) return [key, []];
                  if (typeof value === "string") return [key, ""];
                  if (typeof value === "number") return [key, 0];
                  if (typeof value === "boolean") return [key, false];
                  if (typeof value === "object" && value !== null)
                    return [key, {}];
                  return [key, null]; // fallback
                })
              );
              setDeeplinkParams({
                path: "",
                params: params,
              });
              setDeeplinkPreview("");
            }}
            className="w-full"
            variant="default"
            size="sm"
          >
            Reset deeplink
          </Button>
        </div>
      </div>
    </div>
  );
}
export default withAuth(CreateDeeplinkPage);
