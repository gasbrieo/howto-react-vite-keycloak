import { createFileRoute } from "@tanstack/react-router";

import Login from "@/pages/Login";

export const Route = createFileRoute("/_guest/login")({
  component: Login,
});
