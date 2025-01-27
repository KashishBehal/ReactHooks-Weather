import React, {useState,useRef,useContext,useReducer,useMemo,useCallback,useLayoutEffect, } from "react";

  import useWeather from "../hooks/useWeather";

  import ThemeContext from "../context/ThemeContext";

  import { favoritesReducer } from "../reducers/favoritesReducer";
  import '../App.css';


    const WeatherApp = () => {
    const [location, setLocation] = useState("New Delhi");

    const [favorites, dispatch] = useReducer(favoritesReducer, []);
    const inputRef = useRef(null);

    const { weather, loading } = useWeather(location);
    const theme = useContext(ThemeContext);
  
    const addFavorite = useCallback(() => {
  if (location && !favorites.includes(location)) {
     dispatch({ type: "ADD", payload: location });
      }
    }, [location, favorites]);
  

    const removeFavorite = useCallback((loc) => {
      dispatch({ type: "REMOVE", payload: loc });
    }, []);
  
  const filteredFavorites = useMemo(() => favorites.sort(), [favorites]);
  
    useLayoutEffect(() => {
      document.body.style.fontStyle =
       theme === "dark" ? "" : "italic";
    }, [theme]);
  
             const handleSearch = () => {
                if (inputRef.current) {
        setLocation(inputRef.current.value);
      }};
  
    return (
      <div className={`app ${theme}`}>
        <h1 className="b">Weather Dashboard</h1>
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Enter location..." />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button onClick={addFavorite} className="c">Add to Favorites</button>
        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <div className="favorites">
          <h3>Favorites</h3>
          <ul>
            {filteredFavorites.map((fav) => (
              <li key={fav}>
                {fav} <button onClick={() => removeFavorite(fav)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default WeatherApp;