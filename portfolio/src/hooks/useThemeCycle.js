import { useEffect } from "react";

const themes = [
  {
    primary: "#7c5cff",
    secondary: "#35c2ff",
  },
  {
    primary: "#ff6ec7",
    secondary: "#8b5cf6",
  },
  {
    primary: "#00d4ff",
    secondary: "#00ffa3",
  },
];

export default function useThemeCycle(interval = 12000) {
  useEffect(() => {
    let index = 0;

    const root = document.documentElement;

    const update = () => {
      root.style.setProperty(
        "--color-primary",
        themes[index].primary
      );

      root.style.setProperty(
        "--color-secondary",
        themes[index].secondary
      );

      index = (index + 1) % themes.length;
    };

    update();

    const timer = setInterval(update, interval);

    return () => clearInterval(timer);
  }, [interval]);
}