import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
import { isValidToken, setSession } from "./utils";
import keycloakClient from "../keycloak";
import { PATH_DASHBOARD, PATH_PAGE } from "../routes/paths";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }

  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

export const AuthContext = createContext(null);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("/users/my-account");
        const user = response.data;

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    const initAuthClient = async () => {
      try {
        const authenticated = await keycloakClient.init({
          checkLoginIframe: false,
        });

        if (authenticated) {
          const accessToken = keycloakClient.token;

          setSession(accessToken);

          const response = await axios.get("/users/my-account");
          const user = response.data;

          dispatch({
            type: "LOGIN",
            payload: {
              user,
            },
          });
        }
      } catch (error) {
        if (error) {
          alert("Usted no tiene acceso al sistema");
        }
        console.error("Failed to initialize adapter:", error);
      }
    };

    initAuthClient();
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(() => {
    keycloakClient.login();
  }, []);

  const logout = useCallback(() => {
    keycloakClient.logout();
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
