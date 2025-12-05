import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate cursor-pointer w-full">
      
      {/* Sun Icon */}
      <input
        type="checkbox"
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        checked={theme === "dark"}
      />

      <BsSun className="swap-off w-7 h-7 text-yellow-500" />
      <BsMoon className="swap-on w-7 h-7 text-blue-400" />

    </label>
  );
};

export default ThemeToggle;
