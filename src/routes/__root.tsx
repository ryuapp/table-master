import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Home } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex gap-3 p-2 text-lg">
        <div>
          <Link
            to="/"
            className="flex items-center gap-1"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            <Home size="20" />
            Home
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
