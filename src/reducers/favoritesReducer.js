export const favoritesReducer = (state, action) => {
    switch (action.type) {
      case "ADD":   return [...state, action.payload];
      case  "REMOVE": return state.filter((location) =>
         location !== action.payload);
      default:  
return state;
    }
  };