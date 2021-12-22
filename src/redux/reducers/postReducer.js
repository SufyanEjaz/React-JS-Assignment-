import { SET_POST } from "../contants/action-types";

const initialState = {
  posts: [],
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POST:
      return { ...state, posts: payload };
    default:
      return state;
  }
};
