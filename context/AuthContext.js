import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  async function loginUser(login, password) {
    // Créer une variable data qui stocke la valeur renvoyée par signIn
    const data = await signIn(login, password);

    const authToken = data?.token || data?.access_token;
    // Vérifier si la connexion a réussi
    if (!authToken) {
      throw new Error(data?.error || "Identifiants incorrects");
    }

    // Affecter la valeur data.visiteur à l'état user
    setUser(data.visiteur);

    // Affecter la valeur authToken à l'état token
    setToken(authToken);

    // Renvoyer data
    return data;
  }

  const logoutUser = async () => {
    await signOut();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await getCurrentUser();
        const storedToken = await getAuthToken();
        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Erreur lors de la restauration de session : ", error);
      } finally {
        setSessionLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, sessionLoading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const getAuthToken = async () => {
  const storedToken = await AsyncStorage.getItem("token");
  return storedToken || null;
};

export function useAuth() {
  return useContext(AuthContext);
}
