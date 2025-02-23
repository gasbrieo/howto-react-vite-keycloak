import { createFileRoute, redirect } from "@tanstack/react-router";

import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/_secure/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.hasRole("writer")) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Dashboard,
});
