import { SET_POST } from "../contants/action-types";

export const setPosts = (posts) => {
  return {
    type: SET_POST,
    payload: posts,
  };
};
