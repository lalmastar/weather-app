const intialState = {};
function weatherReducer(state = intialState, action) {
    
  switch (action.type) {
    case "fetch_data":
      state = { ...action.payload };
    default:
      return state;
  }
}
export default weatherReducer;
