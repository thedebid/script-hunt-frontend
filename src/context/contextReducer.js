import httpClient from "../utils/httpClient";
const contextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log(action.payload);
      httpClient
        .POST("/user/login", action.payload)
        .then((response) => {
          state = response.data;
          console.log(state);
          return state;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          //
        });
      return "state";
    // case "ADD_TRANSACTION":
    //   transaction = [action.payload, ...state];
    //   return transaction;

    default:
      return state;
  }
};

export default contextReducer;
