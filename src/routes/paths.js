// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    group: {
      root: `${ROOTS.DASHBOARD}/group`
    },
    candidate: {
      root: `${ROOTS.DASHBOARD}/candidate`,
      new: `${ROOTS.DASHBOARD}/candidate/new`,
      details: (id) => `${ROOTS.DASHBOARD}/candidate/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/candidate/${id}/edit`,
    },
  },
};

export const API_PATHS = {
  signUp: '/api/signup',
  login: '/api/login',

  // Candidate
  candidate: '/api/candidate',
}
