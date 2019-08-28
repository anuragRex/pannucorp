import { SIGN_UP, EMAIL_VERIFY } from '../actions/types';
import { connection } from '../constants/connection';

export const signupUser = signUpData => dispatch => {
  fetch(`${connection}/provider/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpData)
  })
    .then(res => res.json())
    .then(msg =>
      dispatch({
        type: SIGN_UP,
        payload: {
          signUpData,
          status: msg
        }
      })
    );
};

export const verifyEmail = verificationData => dispatch => {
  fetch(`${connection}/provider/email/verification`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(verificationData)
  })
    .then(res => res.json())
    .then(msg =>
      dispatch({
        type: EMAIL_VERIFY,
        payload: {
          verificationData,
          status: msg
        }
      })
    );
};
