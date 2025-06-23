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
import { PdpDeeplink } from "@/components/create-deeplink/PdpDeeplink";
import { SinglePageDeeplinks } from "@/components/create-deeplink/SinglePageDeeplinks";
import Image from "next/image";

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
    const stringifiedParams = qs.stringify(params, {
      arrayFormat: "repeat",
    });
    let deeplink = `${baseUrl}${path}`;
    if (stringifiedParams !== "") {
      deeplink += `?${stringifiedParams}`;
    }
    setDeeplinkPreview(deeplink);
  };

  const renderDeeplinkComponent = {
    search: (
      <SearchDeeplink
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
      />
    ),
    pdp: (
      <PdpDeeplink
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
      />
    ),
    home: (
      <SinglePageDeeplinks
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
        path="home"
      />
    ),
    howItWorks: (
      <SinglePageDeeplinks
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
        path="home/how-it-works/intro"
      />
    ),
    cashback: (
      <SinglePageDeeplinks
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
        path="cashback"
      />
    ),
    shop: (
      <SinglePageDeeplinks
        deeplinkParams={deeplinkParams}
        setDeeplinkParams={setDeeplinkParams}
        path="shop"
      />
    ),
  };

  const renderDeeplinkImage = {
    search: "/images/search.png",
    pdp: "/images/pdp.png",
    home: "/images/home.png",
    shop: "/images/shop.png",
    cashback: "/images/cashback.png",
    howItWorks: "/images/how-it-works.png",
  };

  return (
    <div className="min-h-screen w-full bg-white px-8 py-6">
      <div className="flex gap-8">
        {/* LEFT: Form */}
        <div
          className={`${selectedDeeplinkType ? "w-1/3" : "w-1/2"} space-y-8`}
        >
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Deeplink
            </h1>
          </div>

          <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
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
                <SelectItem value="pdp">PDP</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
                <SelectItem value="cashback">Cashback</SelectItem>
                <SelectItem value="howItWorks">How it works</SelectItem>

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
        <div
          className={`${
            selectedDeeplinkType ? "w-1/3" : "w-1/2"
          } min-w-[300px] max-w-[450px] space-y-4 ml-6`}
        >
          {/* PREVIEW */}
          <div>
            <Label htmlFor="preview" className="block mb-2">
              Output / Preview
            </Label>
            <Textarea
              id="preview"
              className="w-full min-h-[300px] max-h-[300px] resize-none rounded-md border border-gray-300 p-4 text-sm text-gray-800 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Deeplink or JSON preview will appear here..."
              value={deeplinkPreview}
              readOnly={true}
            />
          </div>

          {/* BUTTONS */}
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

          {/* RESET */}
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
              setDeeplinkParams({ path: "", params });
              setDeeplinkPreview("");
            }}
            className="w-full"
            variant="default"
            size="sm"
          >
            Reset deeplink
          </Button>
        </div>
        <div className="w-1/3 flex items-start justify-center pt-4">
          {selectedDeeplinkType && (
            <Image
              src={
                renderDeeplinkImage[
                  selectedDeeplinkType as keyof typeof renderDeeplinkImage
                ]
              }
              width={300}
              height={300}
              alt="Deeplink preview"
              className="rounded-lg border shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default withAuth(CreateDeeplinkPage);
