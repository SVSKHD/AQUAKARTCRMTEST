export const userSignupReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_SIGNUP_STATUS":
      return action.payload;
    default:
      return state;
  }
};
