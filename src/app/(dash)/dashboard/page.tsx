import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApiDashboard from "@/components/ApiDashboard";
import { db } from "@/lib/db";
import RequestApiKey from "@/components/RequestApiKey";

export const metadata: Metadata = {
  title: "Dashboard | Similarity API",
  description: "Dashboard for Similarity API",
};

const Dashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) redirect("/login");

  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });

  return (
    <main className="max-w-7xl mt-16 mx-auto">
      {
      apiKey ? <ApiDashboard/>: 
      <RequestApiKey />}
    </main>
  );
};

export default Dashboard;
