import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import ApiKeyOptions from "./ApiKeyOptions";
import Tester from "./Tester";

const ApiTest = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);

  if (!activeApiKey) return notFound();

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Test Endpoint </LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-start">
        <Paragraph>Your API key :</Paragraph>
        <Input
          className="w-fit truncate"
          readOnly
          value={activeApiKey.key}
        ></Input>
        <ApiKeyOptions apiKey={activeApiKey.key} apiKeyId={activeApiKey.id} />
      </div>

      <Tester apiKey= {activeApiKey.key} />

    </div>
  );
};

export default ApiTest;
