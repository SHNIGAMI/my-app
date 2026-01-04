"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        background: "var(--background)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
        >
          LMS
        </Link>
        <nav style={{ display: "flex", gap: 12, marginLeft: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/welcome">Welcome</Link>
        </nav>
      </div>

      <div>
        {status === "loading" ? (
          <span style={{ color: "#6b7280" }}>Checking session…</span>
        ) : session?.user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {session.user.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "avatar"}
                style={{ width: 32, height: 32, borderRadius: 8 }}
              />
            )}
            <span style={{ color: "#111827" }}>
              {session.user.name ?? session.user.email}
            </span>
          </div>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </div>
    </header>
  );
}
