export async function loginUser(dispatch, loginPayload) {
  dispatch({ type: "LOGIN", payload: loginPayload });
}
