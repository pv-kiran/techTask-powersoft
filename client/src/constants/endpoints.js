export const Baseurl = `https://hrcalenderapi.onrender.com/api`;

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
  ALL_RECRUITERS: `candidate/get/recruiters`,
  // endpoint for fetching schedules of specific recruiter
  RECRUITER_SCHEDULES: (recruiterId, date) => {
    return `/candidate/get/schedules/${recruiterId}/${date}`;
  },
  // booking schedule by candidate
  SCHEDULE_BOOKING: (scheduleId) => {
    return `/candidate/schedule/${scheduleId}/book`;
  },
  CANDIDATE_SCHEDULE: `/candidate/schedules`,
};
