"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import Icons from "./Icons";


interface LoginProps {
    provider: string;
}

const Login: FC<LoginProps> = ({provider}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithProvider = async () => {
    try {
      setIsLoading(true);
      await signIn(provider);
    } catch (error) {
      toast({
        title: "Error signing in",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signInWithProvider} isLoading={isLoading} className="w-fit mx-auto">
      <span className="flex gap-4 px-4 items-center capitalize ">
      Sign in with {provider}
      {provider== "github" && <Icons.Github />}
      {provider== "gitlab" && <Icons.Gitlab />}
      </span>
    </Button>
  );
};

export default Login;
