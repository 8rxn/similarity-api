"use client";
import React, { ButtonHTMLAttributes, FC } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";
import { Clipboard } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  className,
  valueToCopy,
  ...props
}) => {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        toast({
            title: "Copied",
            message: "Text Added to Clipboard",
            type: "success"
        })
    }}
      className={className}
      type="button"
      {...props}
      variant="ghost"
    >
      <Clipboard className="w-5 h-5"/>
    </Button>
  );
};

export default CopyButton;
