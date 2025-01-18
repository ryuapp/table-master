import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "../components/header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <hr className="border-gray-200 dark:border-gray-800" />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
