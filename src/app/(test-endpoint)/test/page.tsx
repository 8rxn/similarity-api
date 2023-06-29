import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ApiTest from "@/components/ApiTest";
import RequestApiKey from "@/components/RequestApiKey";

export const metadata: Metadata = {
  title: "Test Endpoint | Similarity API",
  description: "Test Your Endpoint for Similarity API",
};

const Test = async () => {
  const user = await getServerSession(authOptions);
  if (!user) redirect("/login");

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });

  return (
    <main className="max-w-7xl mt-16 mx-auto">
      {
      apiKey ? <ApiTest/>: 
      <RequestApiKey />}
    </main>
  );
};

export default Test;
