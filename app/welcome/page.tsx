import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";

export default async function WelcomePage() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect("/signin");

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ marginBottom: 8 }}>
        Welcome, {session?.user?.name ?? session?.user?.email}!
      </h1>
      <p style={{ color: "#6b7280" }}>
        You're now signed in. Continue to your dashboard.
      </p>
    </div>
  );
}
