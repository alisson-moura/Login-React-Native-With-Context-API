import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../service/auth';
import api from '../service/api';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RnAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RnAuth:token');

      //tempo de 2seg de espera
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }
    loadStorageData();
  });

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);
    api.defaults.headers.Authorization = `Bearer ${response.token}`;
    await AsyncStorage.setItem('@RnAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RnAuth:token', response.token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
