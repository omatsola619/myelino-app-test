import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: true,
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const checkCookies = async () => {
      const cookies = await AsyncStorage.getItem('cookies');
      if (cookies) {
        setIsAuthenticated(true); // Automatically authenticate if cookies are present
      }
      setIsAuthenticating(false); // Stop loading once the check is complete
    };
    checkCookies();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('cookies');
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isAuthenticating,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
