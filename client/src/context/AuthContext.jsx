import React from 'react';

import { createContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('br_user')));
  const login = (data) => {
    setUser(data);
    localStorage.setItem('br_user', JSON.stringify(data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('br_user');
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export default AuthContext;