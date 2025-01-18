import { type ChangeEvent, type FC, useState } from "react";

type Theme = "system" | "light" | "dark";

export const ColorThemeSelect: FC = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || "system");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Theme;
    setTheme(value);
    localStorage.setItem("theme", value);
    changeTheme();
  };
  const changeTheme = () => {
    const body = document.documentElement;
    if (theme === "dark") {
      body.classList.add("dark");
    } else if (theme === "light") {
      body.classList.remove("dark");
    } else {
      body.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  };
  // Initial theme
  changeTheme();

  return (
    <select
      className="bg-gray-50 bg-transparent text-gray-950 dark:bg-gray-900 dark:text-gray-200"
      value={theme}
      onChange={handleChange}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};
