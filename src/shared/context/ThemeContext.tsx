import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import usePersistState from "../hooks/usePersistState";

interface ThemeContextProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

interface ThemeProviderProps extends PropsWithChildren {}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = usePersistState<"dark" | "light">("theme", "dark");

  useEffect(() => {
    // Apply the dark or light class to the body
    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
