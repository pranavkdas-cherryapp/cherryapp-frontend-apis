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

function CreateDeeplinkPage() {
  const [baseUrl, setBaseUrl] = useState("https://creators.cherryapp.in/");
  const renderDeeplinkComponent = {
    search: <SearchDeeplink />,
  };
  const [selectedDeeplinkType, setSelectedDeeplinkType] = useState<
    string | undefined
  >(undefined);

  return (
    <div className="min-h-screen w-full bg-white px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">Create Deeplink</h1>
      </div>
      <div className="grid gap-2 mt-8">
        <div className="flex items-center">
          <Label htmlFor="baseUrl">Base URL</Label>
        </div>
        <Input
          id="baseUrl"
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          required
          disabled={true}
        />
      </div>
      <div className="grid gap-2 mt-8">
        <div className="flex items-center">
          <Label htmlFor="baseUrl">Select deeplink type</Label>
        </div>
        <Select
          value={selectedDeeplinkType}
          onValueChange={setSelectedDeeplinkType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="search">Search</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedDeeplinkType &&
        renderDeeplinkComponent[
          selectedDeeplinkType as keyof typeof renderDeeplinkComponent
        ]}
    </div>
  );
}

export default withAuth(CreateDeeplinkPage);
