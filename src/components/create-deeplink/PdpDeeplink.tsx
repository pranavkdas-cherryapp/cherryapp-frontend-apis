import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function PdpDeeplink({
  deeplinkParams,
  setDeeplinkParams,
}: {
  deeplinkParams: { path: string; params: any };
  setDeeplinkParams: ({ path, params }: { path: string; params: any }) => void;
}) {
  useEffect(() => {
    setDeeplinkParams({
      path: "shop/productDescriptionPage",
      params: {
        productId: "",
        defaultVariantId: "",
        brandName: "",
        brandId: "",
      },
    });
  }, []);

  return (
    <div>
      <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="productId">Product ID</Label>
        </div>
        <Input
          id="productId"
          type="text"
          placeholder="Enter product ID"
          value={deeplinkParams.params.productId ?? ""}
          className="w-full"
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: { ...deeplinkParams.params, productId: e.target.value },
            })
          }
        />
      </div>
      <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="defaultVariantId">Default Variant ID</Label>
        </div>
        <Input
          id="defaultVariantId"
          type="text"
          placeholder="Enter default variant ID"
          value={deeplinkParams.params.defaultVariantId ?? ""}
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: {
                ...deeplinkParams.params,
                defaultVariantId: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="brandId">Brand ID</Label>
        </div>
        <Input
          id="brandId"
          type="text"
          placeholder="Enter brand ID"
          value={deeplinkParams.params.brandId ?? ""}
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: { ...deeplinkParams.params, brandId: e.target.value },
            })
          }
        />
      </div>
      <div className="mt-8 space-y-2 min-w-[375px] max-w-[375px]">
        <div className="flex items-center">
          <Label htmlFor="brandName">Brand Name</Label>
        </div>
        <Input
          id="brandName"
          type="text"
          placeholder="Enter brand name"
          value={deeplinkParams.params.brandName ?? ""}
          onChange={(e) =>
            setDeeplinkParams({
              ...deeplinkParams,
              params: { ...deeplinkParams.params, brandName: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
}
