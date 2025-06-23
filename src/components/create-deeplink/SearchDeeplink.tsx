import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StringInputWithChips from "@/components/ui/StringInputWithChips";

export function SearchDeeplink({
  deeplinkParams,
  setDeeplinkParams,
}: {
  deeplinkParams: { path: string; params: any };
  setDeeplinkParams: ({ path, params }: { path: string; params: any }) => void;
}) {
  const [filterOptionsInputValue, setFilterOptionsInputValue] = useState("");
  const [selectedFilterOptionsInputValue, setSelectedFilterOptionsInputValue] =
    useState("");
  const [deeplinkWithFilterKey, setDeeplinkWithFilterKey] =
    useState<boolean>(false);

  useEffect(() => {
    setDeeplinkParams({
      path: "shop/searchActive",
      params: {
        searchQuery: "",
        overrideTag: "",
        filterKey: "",
        options: [],
        selectedOptions: [],
      },
    });
  }, []);

  useEffect(() => {
    if (
      deeplinkParams.params?.options &&
      deeplinkParams.params?.options.length === 0
    ) {
      setFilterOptionsInputValue("");
    }
    if (
      deeplinkParams.params?.selectedOptions &&
      deeplinkParams.params?.selectedOptions.length === 0
    ) {
      setSelectedFilterOptionsInputValue("");
    }
  }, [deeplinkParams]);

  return (
    <div>
      <div className="mt-8 space-y-2 max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="baseUrl">Deeplink with filter key</Label>
        </div>
        <Switch
          checked={deeplinkWithFilterKey}
          onCheckedChange={setDeeplinkWithFilterKey}
        />
      </div>
      <div className="mt-8 space-y-2 max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="searchQuery">Search query</Label>
        </div>
        <Input
          id="searchQuery"
          type="text"
          placeholder="Enter search query"
          value={deeplinkParams.params.searchQuery ?? ""}
          className="w-full"
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: { ...deeplinkParams.params, searchQuery: e.target.value },
            })
          }
        />
      </div>
      <div className="mt-8 space-y-2 max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="overrideTag">Override Tag</Label>
        </div>
        <Input
          id="overrideTag"
          type="text"
          placeholder="Enter override tag"
          value={deeplinkParams.params.overrideTag ?? ""}
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: { ...deeplinkParams.params, overrideTag: e.target.value },
            })
          }
        />
      </div>
      {deeplinkWithFilterKey && (
        <>
          <div className="mt-8 space-y-2 max-w-[375px]">
            <div className="flex items-center">
              <Label htmlFor="filterKey">Filter Key</Label>
            </div>
            <Input
              id="filterKey"
              type="text"
              placeholder="Enter filter key"
              value={deeplinkParams.params.filterKey ?? ""}
              className="w-full"
              onChange={(e) =>
                setDeeplinkParams({
                  ...deeplinkParams,
                  params: {
                    ...deeplinkParams.params,
                    filterKey: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="mt-8 space-y-2 max-w-[375px]">
            <div className="flex items-center">
              <Label htmlFor="filterOptions">Filter Options</Label>
            </div>
            <StringInputWithChips
              values={deeplinkParams}
              setValues={setDeeplinkParams}
              paramKey={"options"}
              inputValue={filterOptionsInputValue}
              setInputValue={setFilterOptionsInputValue}
            />
          </div>
          <div className="mt-8 space-y-2 max-w-[375px]">
            <div className="flex items-center">
              <Label htmlFor="selectedFilterOptions">Filter Options</Label>
            </div>
            <StringInputWithChips
              values={deeplinkParams}
              setValues={setDeeplinkParams}
              paramKey={"selectedOptions"}
              inputValue={selectedFilterOptionsInputValue}
              setInputValue={setSelectedFilterOptionsInputValue}
            />
          </div>
        </>
      )}
    </div>
  );
}
