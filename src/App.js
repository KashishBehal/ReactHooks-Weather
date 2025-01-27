import React, { useState } from "react";
import ThemeContext from "./context/ThemeContext";
import WeatherApp from "./components/WeatherApp";
import './App.css';
const App = () => {
  const [theme, setTheme] = useState("Sunny");

  return (
    <ThemeContext.Provider value={theme}>
      <div className="a">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme">
          Toggle Font Style
        </button>
        <WeatherApp />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;