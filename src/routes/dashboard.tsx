import { getSessionServerFn } from "#/modules/auth/auth.api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSessionServerFn();
    return session;
  },
});

function RouteComponent() {
  const session = Route.useRouteContext();
  return <div>Hello {session?.user.name} "/dashboard"!</div>;
}
