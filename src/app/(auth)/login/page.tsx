import Icons from "@/components/Icons";
import Login from "@/components/Login";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Link from "next/link";
import { FC } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Similarity API",
  description: "Free and Open Source",
};

const page: FC = () => {
  return (
    <>
      <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col space-y-6 max-w-lg">
          <div className="flex flex-col items-center gap-6 text-center">
            <Link
              className={buttonVariants({
                variant: "ghost",
                className: "w-fit",
              })}
              href="/"
            >
              <Icons.ChevronLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <LargeHeading>Welcome back!</LargeHeading>
            <Paragraph>
              Please sign in using any of the following providers
            </Paragraph>
          </div>
          <Login provider="github" />
          <Login provider="gitlab" />
          <Login provider="google" />
        </div>
      </div>
    </>
  );
};

export default page;
