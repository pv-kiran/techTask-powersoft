export const Baseurl = `http://localhost:4000/api`;

export const API_ENDPOINTS = {
  SIGNUP: (role) => {
    return `/auth/${role}/signup`;
  },
  SIGNIN: (role) => {
    return `/auth/${role}/signin`;
  },
  SIGNOUT: (role) => {
    return `/auth/${role}/signout`;
  },
  // endpoint for get and post - schedule by recruiter
  RECRUITER_SCHEDULE: `/recruiter/schedule`,
};
