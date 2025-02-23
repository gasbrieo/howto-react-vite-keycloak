import { createFileRoute, redirect } from "@tanstack/react-router";

import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.authenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Home,
});
