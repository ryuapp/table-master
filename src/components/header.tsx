import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { ColorThemeSelect } from "./color-theme-select";

export const Header = () => {
  return (
    <div className="flex justify-between gap-3 p-2 text-lg">
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
      <ColorThemeSelect />
    </div>
  );
};
