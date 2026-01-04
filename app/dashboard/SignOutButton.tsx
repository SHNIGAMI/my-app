import React from "react";

export default function SignOutButton() {
  return (
    <button
      style={{ padding: "8px 12px", cursor: "pointer" }}
      onClick={() => alert("Sign out not configured")}
    >
      Sign out
    </button>
  );
}
