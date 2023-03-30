import React, { createContext, useState, useContext, useEffect } from "react";
import * as auth from "../services/auth";

interface User {
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(email: string, username: string): Promise<void>;
  signUp(email: string): void;
  signOut(): void;
  handleToggleRemember(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem("@proffy:user");
      const storagedToken = await localStorage.getItem("@proffy:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  function handleToggleRemember() {
    setRemember(!remember);
  }

  async function signIn(email: string, password: string) {
    const response = await auth.signIn(password, email);
    console.log(response);
    setUser(response.user);

    if (remember) {
      localStorage.setItem("@proffy:user", JSON.stringify(response.user));
      localStorage.setItem("@proffy:token", response.token);
    }
  }

  async function signUp(email: string) {
    setUser({ email });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        signOut,
        handleToggleRemember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
