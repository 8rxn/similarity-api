"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";
import { createApiKey } from "@/helpers/create-api-key";
import { useRouter } from "next/navigation";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();
  
  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey({ keyId: apiKeyId });
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error Creating API Keys",
        message: "Please Try Again Later",
        type: "error",
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeExistingKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey({ keyId: apiKeyId });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error Revoking API Keys",
        message: "Please Try Again Later",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant={"ghost"} isLoading={isCreatingNew || isRevoking}>
          <p>
            {isCreatingNew
              ? "Creating new key... "
              : isRevoking
              ? "Revoking..."
              : "Options"}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast({
              title: "Copied",
              message: "Copied to Clipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>

        <DropdownMenuItem onClick={createNewApiKey}>
          Create New Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeExistingKey}>Revoke</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
