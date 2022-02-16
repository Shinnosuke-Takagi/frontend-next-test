import { createContext, useCallback, useContext, useState } from 'react';

const AuthenticateContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authenticate: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deauthenticate: () => {},
});

export const AuthenticateProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const deauthenticate = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        deauthenticate,
      }}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export const useAuthenticate = () => useContext(AuthenticateContext);
