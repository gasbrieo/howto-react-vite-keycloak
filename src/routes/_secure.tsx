import type { FC } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const RouteComponent: FC = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/_secure")({
  beforeLoad: ({ context }) => {
    if (!context.auth.authenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});
