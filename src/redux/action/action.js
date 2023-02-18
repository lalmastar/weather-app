const API_KEY = "668a14a241e8323d96804226db1da03c";
export function addCity(city_name) {
  return {
    type: "add_city",
    payload: city_name,
  };
}

export function removeCity(city_name) {
  return {
    type: "remove_city",
    payload: city_name,
  };
}

export function intialUpdate(data) {
  return {
    type: "intialUpdate",
    payload: data,
  };
}

export function fetchData(city_name) {
  return async function (dispatch) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
    let response = await fetch(api);
    let data = response.json();
    return dispatch({
      type: "fetch_data",
      payload: data,
    });
  };
}