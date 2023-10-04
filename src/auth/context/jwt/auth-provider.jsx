import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from 'src/utils/axios';
//
import { API_PATHS } from 'src/routes/paths';
// import jwtDecode from 'jwt-decode';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
  authenticated: false,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      ...action.payload,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
      authenticated: false,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken.split(" ")[1])) {
        setSession(accessToken);

        // const response = await axios.get(API_PATHS.me);
        // const decoded = jwtDecode(accessToken.split(" ")[1]);
        // console.log(decoded,'decode:')

        // const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {},
            authenticated: true,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
            authenticated: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
          authenticated: false,
        },
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post(API_PATHS.login, data);

    if (response?.data?.data) {
      const { token } = response.data.data;

      setSession(token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {},
          authenticated: true,
        },
      });
      return response.data;
    }
    return null;
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await axios.post(API_PATHS.signUp, data);

    const { accessToken, user } = response.data;

    localStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
        authenticated: true,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
