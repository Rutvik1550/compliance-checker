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
    candidate: `${ROOTS.DASHBOARD}/candidate`,
    scanLogs: `${ROOTS.DASHBOARD}/scanLogs`,
  },
};

export const API_PATHS = {
  signUp: '/api/signup',
  login: '/api/login',

  // Candidate
  candidate: '/api/candidate',

  // scan logs
  scanLogs: '/api/checker/scan/logs',
  trigger: '/api/checker/trigger',
}
