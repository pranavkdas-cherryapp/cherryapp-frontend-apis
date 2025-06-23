import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StringInputWithChips from "@/components/ui/StringInputWithChips";

export function SearchDeeplink() {
  const [deeplinkWithFilterKey, setDeeplinkWithFilterKey] =
    useState<boolean>(false);
  const [filterKey, setFilterKey] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>(
    []
  );
  const [overrideTag, setOverrideTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <div className="grid gap-2 mt-8 flex flex-col">
        <div className="flex items-center">
          <Label htmlFor="baseUrl">Deeplink with filter key</Label>
        </div>
        <Switch
          checked={deeplinkWithFilterKey}
          onCheckedChange={setDeeplinkWithFilterKey}
        />
      </div>
      <div className="grid gap-2 mt-8 flex flex-col">
        <div className="flex items-center">
          <Label htmlFor="searchQuery">Search query</Label>
        </div>
        <Input
          id="searchQuery"
          type="text"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-2 mt-8 flex flex-col">
        <div className="flex items-center">
          <Label htmlFor="overrideTag">Override Tag</Label>
        </div>
        <Input
          id="overrideTag"
          type="text"
          placeholder="Enter override tag"
          value={overrideTag}
          onChange={(e) => setOverrideTag(e.target.value)}
        />
      </div>
      {deeplinkWithFilterKey && (
        <>
          <div className="grid gap-2 mt-8 flex flex-col">
            <div className="flex items-center">
              <Label htmlFor="filterKey">Filter Key</Label>
            </div>
            <Input
              id="filterKey"
              type="text"
              placeholder="Enter filter key"
              value={filterKey}
              onChange={(e) => setFilterKey(e.target.value)}
            />
          </div>
          <div className="grid gap-2 mt-8 flex flex-col">
            <div className="flex items-center">
              <Label htmlFor="filterOptions">Filter Options</Label>
            </div>
            <StringInputWithChips
              values={filterOptions}
              setValues={setFilterOptions}
            />
          </div>
          <div className="grid gap-2 mt-8 flex flex-col">
            <div className="flex items-center">
              <Label htmlFor="selectedFilterOptions">Filter Options</Label>
            </div>
            <StringInputWithChips
              values={selectedFilterOptions}
              setValues={setSelectedFilterOptions}
            />
          </div>
        </>
      )}
    </div>
  );
}
