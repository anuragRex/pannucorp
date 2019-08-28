import { SIGN_UP, EMAIL_VERIFY } from "../actions/types";

const initialState = {
  emailVerification: null,
  signupData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        signupData: action.payload
      };

    case EMAIL_VERIFY:
      return {
        ...state,
        emailVerification: action.payload
      };

    default:
      return state;
  }
}
