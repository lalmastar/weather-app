const intialState = [];
function favReducer(state = intialState, action) {
  switch (action.type) {
    
    case "add_city":
      const data = [...new Set([...state, action.payload])];
      localStorage.setItem("weatherapp", JSON.stringify(data));
      return data;

    case "remove_city":
      let newState = state.filter((e) => {
        return e.toLowerCase() != action.payload.toLowerCase();
      });
      localStorage.setItem("weatherapp", JSON.stringify(newState));
      return newState;

    case "intialUpdate":
      localStorage.setItem("weatherapp", JSON.stringify([...action.payload]));
      return [...action.payload];

    default:
      return state;
  }
}
export default favReducer;
