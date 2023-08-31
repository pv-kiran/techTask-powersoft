export const Baseurl = `http://localhost:4000/api`;

export const API_ENDPOINTS = {
  SIGNUP: (role) => {
    return `http://localhost:4000/api/auth/${role}/signup`;
  },
  SIGNIN: (role) => {
    return `http://localhost:4000/api/auth/${role}/signin`;
  },
  SIGNOUT: (role) => {
    return `http://localhost:4000/api/auth/${role}/signout`;
  },
};
